import React from 'react';
import { AlertTriangle, CheckCircle, Activity, Search, Shield, Eye, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const ResultCard = ({ result, loading }) => {
    if (loading) {
        return (
            <div className="w-full mt-8 p-12 border border-blue-500/20 bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden relative shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_infinite]" />
                <div className="flex flex-col items-center justify-center py-8">
                    {/* Scanner Animation */}
                    <div className="relative w-24 h-24 mb-6">
                        <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-purple-500 animate-spin" />
                        <div className="absolute inset-3 rounded-full border-l-2 border-r-2 border-cyan-400 animate-spin-reverse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Search className="w-8 h-8 text-fuchsia-300 animate-pulse" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 tracking-widest">RUNNING FORENSICS</h3>
                    <div className="flex flex-col items-center gap-1 font-mono text-xs text-purple-300">
                        <span>ANALYZING PIXEL STRUCTURE...</span>
                        <span className="opacity-70 text-cyan-400">CHECKING COMPRESSION ARTIFACTS...</span>
                        <span className="opacity-50 text-fuchsia-400">VERIFYING METADATA INTEGRITY...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!result) return null;

    const isFake = result.display_label === 'FAKE';
    const score = result.score || 0;
    const scorePercent = (score * 100).toFixed(1);
    // Use vibrant neon colors instead of muted ones
    const color = isFake ? 'rose' : 'emerald';
    const gradientColor = isFake ? 'from-rose-500 to-red-600' : 'from-emerald-400 to-green-600';
    const shadowColor = isFake ? 'shadow-rose-500/50' : 'shadow-emerald-500/50';
    const ColorIcon = isFake ? AlertTriangle : CheckCircle;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full mt-8"
        >
            {/* Verdict Banner */}
            <div className={`relative overflow-hidden rounded-t-2xl border-t border-x border-${color}-500/50 bg-slate-900/90 backdrop-blur-md`}>
                <div className={`absolute top-0 inset-x-0 h-1 bg-${color}-500 shadow-[0_0_20px_rgba(0,0,0,0.8)] ${shadowColor}`} />

                <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className={`relative p-4 rounded-xl bg-${color}-500/10 border border-${color}-500/40 shadow-[0_0_30px_rgba(0,0,0,0.3)] ${shadowColor}`}>
                            <div className={`absolute inset-0 bg-${color}-500/20 blur-xl rounded-full`} />
                            <ColorIcon className={`relative w-12 h-12 text-${color}-400 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                        </div>
                        <div>
                            <h2 className={`text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r ${gradientColor} mb-1 drop-shadow-sm`}>
                                {isFake ? 'MANIPULATON DETECTED' : 'AUTHENTIC CONTENT'}
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] bg-${color}-500/20 text-${color}-300 font-mono border border-${color}-500/30`}>
                                    CONFIDENCE: {scorePercent}%
                                </span>
                                <span className="text-slate-500 text-xs font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Circular Gauge */}
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90 drop-shadow-lg">
                            <circle cx="64" cy="64" r="60" stroke="#1e293b" strokeWidth="8" fill="none" />
                            <motion.circle
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: score }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                cx="64" cy="64" r="60"
                                stroke={isFake ? '#f43f5e' : '#34d399'}
                                strokeWidth="8"
                                fill="none"
                                strokeDasharray="377"
                                strokeLinecap="round"
                                className="filter drop-shadow-[0_0_4px_currentColor]"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className={`text-3xl font-bold text-${color}-400`}>{Math.round(score * 100)}</span>
                            <span className="text-[10px] text-slate-400 uppercase">Score</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Details */}
            <div className="rounded-b-2xl border-x border-b border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Explanation Block */}
                <div className="flex gap-4 mb-8">
                    <div className="mt-1">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-purple-500/30">
                            <Activity className="w-5 h-5 text-purple-400" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-2">AI Model Reasoning</h4>
                        <p className="text-lg text-slate-200 leading-relaxed font-light">
                            {result.explanation}
                        </p>
                    </div>
                </div>

                {/* Indicators Grid */}
                {result.indicators && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.indicators.map((indicator, idx) => (
                            <div key={idx} className="group relative p-4 rounded-xl bg-black/40 border border-slate-700 hover:border-fuchsia-500/40 transition-all overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex items-start gap-4 relative">
                                    <div className="mt-1 p-1.5 rounded bg-slate-800 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors">
                                        {idx % 2 === 0 ? <Eye className="w-4 h-4" /> : <Database className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <h5 className="text-fuchsia-200 font-medium mb-1 font-mono group-hover:text-fuchsia-100">{indicator.label}</h5>
                                        <p className="text-sm text-slate-400 group-hover:text-slate-300">{indicator.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center text-xs text-slate-600 font-mono">
                    <span>TIMESTAMP: {new Date().toISOString()}</span>
                    <span>HASH: {Math.random().toString(36).substr(2, 16).toUpperCase()}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultCard;
