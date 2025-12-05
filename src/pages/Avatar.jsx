import React from 'react';
import { Palette, Star, Zap, Shield, TrendingUp, Award, Check } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import CoinLeoMascot from '../components/CoinLeoMascot';

const Avatar = () => {
    const { equippedItems, inventory, level } = useCurrency();

    const slots = [
        { id: 'hat', name: 'Hat', icon: <Star size={24} />, color: '#4F46E5' },
        { id: 'outfit', name: 'Outfit', icon: <Palette size={24} />, color: '#10B981' },
        { id: 'accessory', name: 'Accessory', icon: <Zap size={24} />, color: '#F59E0B' },
        { id: 'badge', name: 'Badge', icon: <Award size={24} />, color: '#EC4899' }
    ];

    const getEquippedItem = (slot) => {
        return equippedItems[slot] || null;
    };

    const getActiveBuffs = () => {
        return Object.values(equippedItems)
            .filter(item => item && item.buff)
            .map(item => item.buff);
    };

    const activeBuffs = getActiveBuffs();

    return (
        <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Palette size={40} style={{ color: '#4F46E5' }} />
                        <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Avatar Customization</h1>
                    </div>
                    <p style={{ fontSize: '1.25rem', color: '#4B5563' }}>
                        Customize your character and activate special buffs!
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '2rem' }}>
                    {/* Equipment Slots */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                            Equipment Slots
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {slots.map(slot => {
                                const equipped = getEquippedItem(slot.id);
                                return (
                                    <div
                                        key={slot.id}
                                        className="card"
                                        style={{
                                            background: equipped ? `linear-gradient(135deg, ${slot.color}15, ${slot.color}05)` : 'white',
                                            borderColor: equipped ? slot.color : '#E5E7EB'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '3rem',
                                                height: '3rem',
                                                background: slot.color,
                                                borderRadius: '0.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white'
                                            }}>
                                                {slot.icon}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>
                                                    {slot.name}
                                                </p>
                                                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                                                    {equipped ? equipped.name : 'Empty'}
                                                </p>
                                            </div>
                                            {equipped && (
                                                <span style={{ fontSize: '1.5rem' }}>{equipped.emoji}</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Avatar Preview */}
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '3rem'
                    }}>
                        <div style={{
                            background: 'white',
                            borderRadius: '50%',
                            padding: '2rem',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            marginBottom: '2rem'
                        }}>
                            <CoinLeoMascot size={250} mood="proud" />
                        </div>
                        <div className="badge badge-primary" style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}>
                            <Star size={20} fill="currentColor" />
                            <span>Level {level}</span>
                        </div>
                    </div>

                    {/* Active Buffs */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={24} style={{ color: '#10B981' }} />
                            Active Buffs
                        </h2>
                        {activeBuffs.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {activeBuffs.map((buff, index) => (
                                    <div
                                        key={index}
                                        className="card"
                                        style={{
                                            background: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
                                            borderColor: '#6EE7B7'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                            <Zap size={20} style={{ color: '#10B981' }} />
                                            <p style={{ fontWeight: 700, color: '#065F46' }}>{buff.type}</p>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: '#047857' }}>
                                            {buff.description}
                                        </p>
                                        <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#10B981', marginTop: '0.5rem' }}>
                                            +{buff.value}% Bonus
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                                <Shield size={48} style={{ color: '#D1D5DB', margin: '0 auto 1rem' }} />
                                <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
                                    No active buffs. Equip items from the shop to gain special abilities!
                                </p>
                            </div>
                        )}

                        {/* Stats Summary */}
                        <div className="card" style={{ marginTop: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <TrendingUp size={20} style={{ color: '#4F46E5' }} />
                                Your Stats
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <StatRow label="Items Equipped" value={Object.keys(equippedItems).length} />
                                <StatRow label="Total Items" value={inventory.length} />
                                <StatRow label="Active Buffs" value={activeBuffs.length} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inventory Section */}
                <div style={{ marginTop: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                        Your Inventory ({inventory.length} items)
                    </h2>
                    {inventory.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem' }}>
                            {inventory.map((item, index) => (
                                <div
                                    key={index}
                                    className="card"
                                    style={{
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
                                    }}
                                >
                                    <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{item.emoji}</div>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                            <Palette size={64} style={{ color: '#D1D5DB', margin: '0 auto 1rem' }} />
                            <p style={{ fontSize: '1.125rem', color: '#6B7280', marginBottom: '1rem' }}>
                                No items yet!
                            </p>
                            <p style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
                                Visit the shop to buy items and customize your avatar
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatRow = ({ label, value }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid #E5E7EB'
    }}>
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>{label}</span>
        <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{value}</span>
    </div>
);

export default Avatar;
