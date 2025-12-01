import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ShieldCheck, Gamepad2 } from 'lucide-react';

const Hero = () => {
    return (
        <section className="container" style={{ padding: '4rem 2rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="grid-cols-2" style={{ alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Take the Fear Out of Money
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                        Join CoinLeo on an adventure to master your finances. Learn to save, spend wisely, and build confidence for the future—all while playing games!
                    </p>
                    <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '1rem' }}>
                        <Link to="/dashboard" className="btn btn-primary">
                            <Rocket size={20} /> Start Your Adventure
                        </Link>
                        <button className="btn btn-secondary" style={{ background: 'transparent', color: 'var(--color-secondary)', border: '2px solid var(--color-secondary)' }}>
                            For Parents
                        </button>
                    </div>

                    <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem' }}>
                        <Feature icon={<Gamepad2 size={24} />} text="Fun Games" />
                        <Feature icon={<ShieldCheck size={24} />} text="Safe Learning" />
                    </div>
                </div>

                <div className="flex-center" style={{ position: 'relative' }}>
                    <div style={{
                        width: '400px',
                        height: '400px',
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        borderRadius: '50%',
                        opacity: 0.2,
                        position: 'absolute',
                        zIndex: -1
                    }}></div>
                    <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', maxWidth: '350px' }}>
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=CoinLeo&backgroundColor=FFD700"
                            alt="CoinLeo Character"
                            style={{ width: '200px', height: '200px', marginBottom: '1rem' }}
                        />
                        <h3>Hi, I'm CoinLeo!</h3>
                        <p>I'm here to help you become a money master. Are you ready?</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Feature = ({ icon, text }) => (
    <div className="flex-center" style={{ gap: '0.5rem', color: 'var(--text-muted)', fontWeight: '600' }}>
        <div style={{ color: 'var(--color-secondary)' }}>{icon}</div>
        <span>{text}</span>
    </div>
);

export default Hero;
