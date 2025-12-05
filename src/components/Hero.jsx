import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Target, TrendingUp, Award } from 'lucide-react';
import CoinLeoMascot from './CoinLeoMascot';

const Hero = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            {/* Hero Section */}
            <div className="container py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content */}
                    <div className="animate-slideUp">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
                            <Sparkles className="text-indigo-600" size={16} />
                            <span className="text-sm font-medium text-indigo-700">Financial Literacy for Kids</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Learn About Money with <span className="text-indigo-600">CoinLeo</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Make learning about money fun! Play games, earn rewards, and build smart money habits that last a lifetime.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/dashboard" className="btn btn-primary text-lg px-8 py-4">
                                Start Learning
                            </Link>
                            <Link to="/shop" className="btn btn-secondary text-lg px-8 py-4">
                                Explore Shop
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Mascot */}
                    <div className="flex justify-center lg:justify-end animate-fadeIn">
                        <div className="relative">
                            <div className="absolute inset-0 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
                            <CoinLeoMascot size={300} mood="excited" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Kids Love CoinLeo</h2>
                    <p className="text-lg text-gray-600">Everything you need to learn about money in one fun place</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Sparkles className="text-indigo-600" size={28} />}
                        title="Fun Learning Games"
                        description="Play interactive games that teach real money skills while having fun"
                    />
                    <FeatureCard
                        icon={<Target className="text-green-600" size={28} />}
                        title="Set Savings Goals"
                        description="Track your progress towards things you want to buy and learn to save"
                    />
                    <FeatureCard
                        icon={<Award className="text-amber-600" size={28} />}
                        title="Earn Rewards"
                        description="Get coins and badges as you learn and complete challenges"
                    />
                </div>
            </div>

            {/* CTA Section */}
            <div className="container py-16">
                <div className="card bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Your Money Journey?</h2>
                    <p className="text-xl text-indigo-100 mb-8">Join thousands of kids learning smart money habits</p>
                    <Link to="/dashboard" className="btn bg-white text-indigo-600 hover:bg-gray-50 text-lg px-8 py-4 inline-flex">
                        Get Started Free
                    </Link>
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="card text-center hover:shadow-lg transition-all">
        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export default Hero;
