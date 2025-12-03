import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ShieldCheck, Gamepad2, TrendingUp } from 'lucide-react';
import CoinLeoMascot from './CoinLeoMascot';

const Hero = () => {
    return (
        <section className="container pt-16 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h1 className="text-6xl font-bold leading-tight">
                        <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                            Take the Fear
                        </span>
                        <br />
                        <span className="text-gray-900">Out of Money</span>
                    </h1>

                    <p className="text-xl text-gray-600 leading-relaxed">
                        Join CoinLeo on an adventure to master your finances. Learn to save, spend wisely,
                        and build confidence for the future—all while playing fun games!
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link to="/dashboard" className="btn btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform">
                            <Rocket size={24} className="animate-bounce-slow" />
                            Start Your Adventure
                        </Link>
                        <button className="btn btn-secondary text-lg px-8 py-4 bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-50">
                            For Parents
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-8">
                        <Feature icon={<Gamepad2 size={32} />} title="Fun Games" description="Learn through play" />
                        <Feature icon={<ShieldCheck size={32} />} title="Safe Learning" description="Kid-friendly environment" />
                        <Feature icon={<TrendingUp size={32} />} title="Track Progress" description="Watch skills grow" />
                        <Feature icon={<Rocket size={32} />} title="Earn Rewards" description="Unlock cool items" />
                    </div>
                </div>

                <div className="relative flex items-center justify-center">
                    {/* Background Glow */}
                    <div className="absolute w-96 h-96 bg-gradient-to-br from-yellow-300 to-purple-400 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>

                    {/* Mascot Card */}
                    <div className="glass-panel p-10 rounded-3xl text-center max-w-md relative z-10 animate-float">
                        <div className="mb-6">
                            <CoinLeoMascot size={220} mood="excited" />
                        </div>
                        <h3 className="text-3xl font-bold mb-3">Hi, I'm CoinLeo!</h3>
                        <p className="text-lg text-gray-600">
                            I'm here to help you become a money master. Are you ready to start your journey?
                        </p>

                        {/* Floating Elements */}
                        <div className="absolute -top-4 -right-4 text-4xl animate-bounce">💰</div>
                        <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>⭐</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Feature = ({ icon, title, description }) => (
    <div className="glass-panel p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer">
        <div className="flex items-start gap-3">
            <div className="text-purple-600 flex-shrink-0">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    </div>
);

export default Hero;
