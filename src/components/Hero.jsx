import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Target, Trophy, Gamepad2, ArrowRight } from 'lucide-react';
import CoinLeoMascot from './CoinLeoMascot';

const Hero = () => {
    return (
        <div style={{ background: 'linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%)', minHeight: '100vh' }}>
            <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
                {/* Hero Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
                    <div>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: '#FEF3C7',
                            borderRadius: '9999px',
                            marginBottom: '1.5rem'
                        }}>
                            <Sparkles size={20} style={{ color: '#F59E0B' }} />
                            <span style={{ fontWeight: 600, color: '#92400E' }}>Financial Literacy for Kids</span>
                        </div>

                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                            Learn About Money with <span style={{ color: '#4F46E5' }}>CoinLeo</span>
                        </h1>

                        <p style={{ fontSize: '1.25rem', color: '#4B5563', marginBottom: '2rem', lineHeight: 1.6 }}>
                            Make learning about money fun! Play interactive games, earn rewards, and build smart money habits that last a lifetime.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                                Start Learning <ArrowRight size={20} />
                            </Link>
                            <Link to="/shop" className="btn btn-secondary" style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>
                                Explore Shop
                            </Link>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CoinLeoMascot size={400} mood="excited" />
                    </div>
                </div>

                {/* Features */}
                <div>
                    <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Kids Love CoinLeo</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                        <FeatureCard
                            icon={<Gamepad2 size={32} style={{ color: '#4F46E5' }} />}
                            title="Interactive Games"
                            description="Play fun games that teach real money skills"
                        />
                        <FeatureCard
                            icon={<Target size={32} style={{ color: '#10B981' }} />}
                            title="Savings Goals"
                            description="Track progress towards things you want to buy"
                        />
                        <FeatureCard
                            icon={<Trophy size={32} style={{ color: '#F59E0B' }} />}
                            title="Earn Rewards"
                            description="Get coins and badges as you learn"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="card" style={{ textAlign: 'center' }}>
        <div style={{
            width: '4rem',
            height: '4rem',
            background: '#F3F4F6',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
        }}>
            {icon}
        </div>
        <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: '#4B5563' }}>{description}</p>
    </div>
);

export default Hero;
