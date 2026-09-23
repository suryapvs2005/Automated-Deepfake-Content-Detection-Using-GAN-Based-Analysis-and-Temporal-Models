import React from 'react';
import { Shield, Sparkles } from 'lucide-react';

const Header = () => {
    return (
        <header className="fixed top-0 z-50 w-full mb-8 border-b border-teal-900/30 bg-[#020617]/80 backdrop-blur-md">
            <div className="container relative mx-auto flex h-20 items-center justify-between px-6">

                {/* Logo Section */}
                <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-teal-500/10 border border-teal-500/20">
                        <Shield className="relative h-6 w-6 text-teal-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-white leading-none">
                            TruthLens <span className="text-teal-400">AI</span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            Deepfake Detection
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#analyze" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">Analyze</a>
                    <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">How It Works</a>
                    <a href="#features" className="text-sm font-medium text-slate-300 hover:text-teal-400 transition-colors">Features</a>
                </nav>

                {/* Right Action */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        AI Powered
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
