import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { shopItems } from '../data/items';
import { Link } from 'react-router-dom';

const Avatar = () => {
    const { equippedItems, equipItem, unequipItem, inventory, stats } = useCurrency();

    const ownedItems = inventory.filter(item => shopItems.find(si => si.id === item.id));

    const handleEquip = (item) => {
        equipItem(item);
    };

    const handleUnequip = (slot) => {
        unequipItem(slot);
    };

    const getItemsForSlot = (slot) => {
        return ownedItems.filter(item => {
            const fullItem = shopItems.find(si => si.id === item.id);
            return fullItem && fullItem.type === slot;
        });
    };

    return (
        <div className="container pt-8 pb-16">
            <header className="mb-8 text-center">
                <h2 className="text-4xl font-bold mb-2">Avatar Customization</h2>
                <p className="text-gray-600">Equip items to boost your abilities!</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Avatar Preview */}
                <div className="lg:col-span-1">
                    <div className="glass-panel p-8 rounded-2xl text-center sticky top-8">
                        <h3 className="text-2xl font-bold mb-6">Your Avatar</h3>

                        {/* Avatar Display */}
                        <div className="relative w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                            <div className="text-8xl">👤</div>

                            {/* Equipped Items Overlay */}
                            {equippedItems.hat && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-6xl">
                                    {shopItems.find(i => i.id === equippedItems.hat.id)?.emoji}
                                </div>
                            )}
                            {equippedItems.cape && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-6xl">
                                    {shopItems.find(i => i.id === equippedItems.cape.id)?.emoji}
                                </div>
                            )}
                            {equippedItems.pet && (
                                <div className="absolute bottom-0 right-0 text-5xl">
                                    {shopItems.find(i => i.id === equippedItems.pet.id)?.emoji}
                                </div>
                            )}
                            {equippedItems.accessory && (
                                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-5xl">
                                    {shopItems.find(i => i.id === equippedItems.accessory.id)?.emoji}
                                </div>
                            )}
                        </div>

                        {/* Active Buffs */}
                        <div className="bg-purple-100 p-4 rounded-xl">
                            <h4 className="font-bold text-purple-900 mb-3 flex items-center justify-center gap-2">
                                <Sparkles size={20} />
                                Active Buffs
                            </h4>
                            <div className="space-y-2 text-sm">
                                {stats.coinBonus > 0 && (
                                    <div className="text-purple-800">💰 +{stats.coinBonus}% Coins</div>
                                )}
                                {stats.xpBoost > 0 && (
                                    <div className="text-purple-800">⭐ +{stats.xpBoost}% XP</div>
                                )}
                                {stats.hintAvailable && (
                                    <div className="text-purple-800">💡 Hints Available</div>
                                )}
                                {stats.dailyBonus > 0 && (
                                    <div className="text-purple-800">🎁 +{stats.dailyBonus} Daily Bonus</div>
                                )}
                                {stats.coinBonus === 0 && stats.xpBoost === 0 && !stats.hintAvailable && stats.dailyBonus === 0 && (
                                    <div className="text-gray-500 italic">No active buffs</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Equipment Slots */}
                <div className="lg:col-span-2 space-y-6">
                    <EquipmentSlot
                        title="Hat"
                        slot="hat"
                        equipped={equippedItems.hat}
                        availableItems={getItemsForSlot('hat')}
                        onEquip={handleEquip}
                        onUnequip={handleUnequip}
                    />
                    <EquipmentSlot
                        title="Cape"
                        slot="cape"
                        equipped={equippedItems.cape}
                        availableItems={getItemsForSlot('cape')}
                        onEquip={handleEquip}
                        onUnequip={handleUnequip}
                    />
                    <EquipmentSlot
                        title="Pet"
                        slot="pet"
                        equipped={equippedItems.pet}
                        availableItems={getItemsForSlot('pet')}
                        onEquip={handleEquip}
                        onUnequip={handleUnequip}
                    />
                    <EquipmentSlot
                        title="Accessory"
                        slot="accessory"
                        equipped={equippedItems.accessory}
                        availableItems={getItemsForSlot('accessory')}
                        onEquip={handleEquip}
                        onUnequip={handleUnequip}
                    />

                    {ownedItems.length === 0 && (
                        <div className="glass-panel p-8 rounded-2xl text-center">
                            <ShoppingBag size={48} className="mx-auto mb-4 text-gray-400" />
                            <h3 className="text-xl font-bold mb-2">No Items Yet</h3>
                            <p className="text-gray-600 mb-4">Visit the shop to buy items and customize your avatar!</p>
                            <Link to="/shop" className="btn btn-primary">
                                Go to Shop
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const EquipmentSlot = ({ title, slot, equipped, availableItems, onEquip, onUnequip }) => {
    return (
        <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">{title}</h3>

            {/* Currently Equipped */}
            {equipped ? (
                <div className="bg-green-100 p-4 rounded-xl mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{shopItems.find(i => i.id === equipped.id)?.emoji}</span>
                            <div>
                                <div className="font-bold">{shopItems.find(i => i.id === equipped.id)?.name}</div>
                                <div className="text-sm text-gray-600">
                                    {shopItems.find(i => i.id === equipped.id)?.buff?.description}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => onUnequip(slot)}
                            className="btn btn-secondary text-sm px-3 py-1"
                        >
                            Unequip
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-100 p-4 rounded-xl mb-4 text-center text-gray-500 italic">
                    No item equipped
                </div>
            )}

            {/* Available Items */}
            {availableItems.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Available Items:</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {availableItems.map(item => {
                            const fullItem = shopItems.find(si => si.id === item.id);
                            const isEquipped = equipped?.id === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => !isEquipped && onEquip(fullItem)}
                                    disabled={isEquipped}
                                    className={`glass-panel p-3 rounded-xl text-left transition-all ${isEquipped ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl">{fullItem.emoji}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-sm truncate">{fullItem.name}</div>
                                            <div className="text-xs text-gray-600 truncate">{fullItem.buff?.description}</div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Avatar;
