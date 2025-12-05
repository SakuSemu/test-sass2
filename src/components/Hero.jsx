import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Target, Trophy, Gamepad2 } from 'lucide-react';
import CoinLeoMascot from './CoinLeoMascot';

const Hero = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-purple-50">
            {/* Main Hero Section */}
            <div className="container py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column */}
                    <div className="text-center lg:text-left animate-bounce-in">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-100 rounded-full mb-6 shadow-md">
                            <Sparkles className="text-yellow-600" size={24} />
                            <span className="font-bold text-yellow-800 text-lg">Learn Money Skills!</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Make Learning <span className="text-gradient">Money</span> Super Fun! 🎉
                        </h1>

                        <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
                            Play games, earn coins, and become a money master with CoinLeo!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link to="/dashboard" className="btn btn-primary text-xl px-8 py-6 shadow-fun">
                                🚀 Start Playing
                            </Link>
                            <Link to="/shop" className="btn btn-secondary text-xl px-8 py-6">
                                🛍️ Visit Shop
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Mascot */}
                    <div className="flex justify-center animate-float">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                            <div className="relative">
                                <CoinLeoMascot size={350} mood="excited" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container pb-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Why Kids Love CoinLeo! ❤️</h2>
                    <p className="text-xl text-gray-600">Everything you need to learn about money!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon="🎮"
                        title="Fun Games"
                        description="Play awesome games and learn money skills at the same time!"
                        color="green"
                    />
                    <FeatureCard
                        icon="🎯"
                        title="Save for Goals"
                        description="Set goals and watch your savings grow to buy what you want!"
                        color="orange"
                    />
                    <FeatureCard
                        icon="🏆"
                        title="Earn Rewards"
                        description="Get coins, badges, and level up as you learn!"
                        color="blue"
                    />
                </div>
            </div>

            {/* CTA Section */}
            <div className="container pb-20">
                <div className="fun-card fun-card-green text-center p-12 shadow-fun">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start? 🌟</h2>
                    <p className="text-2xl text-gray-700 mb-8">Join thousands of kids learning about money!</p>
                    <Link to="/dashboard" className="btn btn-primary text-2xl px-10 py-6 shadow-fun">
                        Let's Go! 🚀
                    </Link>
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, color }) => {
    const colorClass = color === 'green' ? 'fun-card-green' : color === 'orange' ? 'fun-card-orange' : 'fun-card-blue';

    return (
        <div className={`fun-card ${colorClass} text-center p-8 animate-bounce-in`}>
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-lg text-gray-700">{description}</p>
        </div>
    );
};

export default Hero;
