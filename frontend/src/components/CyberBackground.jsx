import React, { useEffect, useRef } from 'react';

const CyberBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#000510]">
            {/* Base Gradient - Deep dark blue/black */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(6,182,212,0.1),_transparent_80%)]" />

            {/* Technical Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,_transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,_transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />

            {/* Shield/Central Glow Hint */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[100px]" />

            {/* Moving particles/scanlines */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        </div>
    );
};

export default CyberBackground;
