import React, { useEffect, useRef, useState } from 'react';

export default function PitchDeck() {
  const [ringsVisible, setRingsVisible] = useState(false);
  const ringsRef = useRef(null);

  // Intersection Observer to trigger the 3-second sweep animation when Section 6 is scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRingsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ringsRef.current) {
      observer.observe(ringsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Reusable SVG Ring Component for the Data Animation
  const Ring = ({ radius, color, percentage, isVisible }) => {
    const circumference = 2 * Math.PI * radius;
    // Calculate how much of the ring should be empty (gray) vs filled (colored)
    const strokeDashoffset = isVisible 
      ? circumference - (percentage / 100) * circumference 
      : circumference;

    return (
      <g>
        {/* The 70% Opacity Gray Track */}
        <circle 
          cx="200" cy="200" r={radius} 
          fill="none" 
          stroke="rgba(82, 82, 91, 0.3)" // zinc-600 with low opacity
          strokeWidth="14" 
        />
        {/* The Colored Data Track */}
        <circle 
          cx="200" cy="200" r={radius} 
          fill="none" 
          stroke={color} 
          strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          strokeLinecap="butt"
          transform="rotate(-90 200 200)" // Starts the sweep from the top (12 o'clock)
        />
      </g>
    );
  };

  return (
    <div className="bg-[#121214] text-zinc-300 min-h-screen selection:bg-blue-500/30 selection:text-white font-sans overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .fade-in-up { animation: fadeInUp 1s ease-out forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* 1. The Hero Viewport */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative border-b border-zinc-800/50">
        <div className="max-w-4xl fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
            Veterinary care is broken.
          </h1>
          <h2 className="text-3xl md:text-5xl text-zinc-500 font-semibold mb-16">
            We are fixing the handoff.
          </h2>
        </div>
        
        <div className="absolute bottom-12 left-12 text-zinc-500 font-mono text-sm hidden md:block">
          &gt; Built by a 16-year-old solo dev in Maharashtra, India.
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-pulse text-zinc-600">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* 2. The Terminal Founder Memo */}
      <section className="py-24 px-6 max-w-3xl mx-auto fade-in-up delay-1">
        <div className="bg-[#18181b] border border-zinc-800 rounded-lg p-6 font-mono text-sm shadow-2xl">
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
            <span className="text-zinc-500 ml-2">founder_memo.sh</span>
          </div>
          <p className="text-zinc-400 leading-relaxed">
            <span className="text-white font-bold"># Full transparency:</span><br/><br/>
            My frontend is broken today, so instead of a flashy UI video, I am pitching you the raw B2B2C math and zero-server backend architecture. 
            <br/><br/>
            I decided to pitch this to someone who actually understands early-stage leverage rather than waiting for perfect CSS.
          </p>
        </div>
      </section>

      {/* 3. The Problem & Solution (Split Screen) */}
      <section className="py-24 px-6 max-w-6xl mx-auto border-t border-zinc-800/50">
        <div className="grid md:grid-cols-2 gap-0 border border-zinc-800 rounded-lg overflow-hidden">
          {/* Problem */}
          <div className="p-10 border-b md:border-b-0 md:border-r border-zinc-800 bg-[#151517] relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500/80"></div>
            <h3 className="text-sm font-mono text-red-400 mb-6 uppercase tracking-widest">01. The Problem</h3>
            <p className="text-xl text-zinc-300 leading-relaxed font-medium">
              Vets are burned out from typing medical files for 12 hours a day. Pet owners leave the clinic stressed, forget the vet's exact instructions, and guess on critical medication dosages at home.
            </p>
          </div>
          {/* Solution */}
          <div className="p-10 bg-[#151517] relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500/80"></div>
            <h3 className="text-sm font-mono text-green-400 mb-6 uppercase tracking-widest">02. The Solution (AI Intake Bridge)</h3>
            <ul className="text-lg text-zinc-400 space-y-4">
              <li className="flex gap-4"><span className="text-white font-mono">1.</span> The vet speaks normally into the app for 60 seconds.</li>
              <li className="flex gap-4"><span className="text-white font-mono">2.</span> The AI instantly structures a clinical report for the vet.</li>
              <li className="flex gap-4"><span className="text-white font-mono">3.</span> The AI dynamically generates a foolproof, 2D drum-wheel Daily Care UI strictly based on the diagnosis for the owner.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. The Moat Flowchart */}
      <section className="py-24 px-6 bg-[#0a0a0b] border-y border-zinc-800/50 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-16">The Moat: Zero-Server Architecture</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 font-mono text-sm mb-12">
            <div className="bg-zinc-900 border border-zinc-700 text-zinc-300 py-4 px-6 rounded w-full md:w-auto">Vet dictates locally</div>
            <div className="text-zinc-600 hidden md:block">──────&gt;</div>
            <div className="text-zinc-600 md:hidden">|</div>
            <div className="bg-zinc-900 border border-zinc-700 text-zinc-300 py-4 px-6 rounded w-full md:w-auto">Owner pays & scans QR</div>
            <div className="text-zinc-600 hidden md:block">──────&gt;</div>
            <div className="text-zinc-600 md:hidden">|</div>
            <div className="bg-zinc-900 border border-green-500/50 text-green-400 py-4 px-6 rounded w-full md:w-auto">Trigger Server Upload</div>
          </div>

          <div className="inline-block bg-zinc-900 border border-zinc-800 p-6 rounded-lg text-left">
            <p className="font-mono text-zinc-400">
              <span className="text-white">System.Log:</span> No payment = No QR scan = No API trigger. 
              <br/><span className="text-blue-400 mt-2 block">Zero wasted compute costs on free users.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 5. Unit Economics (Worst-Case Math) */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">Unit Economics <span className="text-zinc-600 text-xl font-normal ml-2">(The "No-Brainer" Worst-Case Math)</span></h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-lg">
            <h4 className="text-sm font-mono text-zinc-500 mb-6 uppercase">The Setup</h4>
            <div className="mb-4">
              <span className="text-zinc-400 block mb-1">Starter SaaS Fee</span>
              <span className="text-3xl font-bold text-white font-mono">₹2,599<span className="text-lg text-zinc-600">/mo</span></span>
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">Owner Digital Tracker Upsell</span>
              <span className="text-3xl font-bold text-white font-mono">₹200<span className="text-lg text-zinc-600">/scan</span></span>
            </div>
          </div>

          <div className="bg-[#151517] border border-blue-900/30 p-8 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
            </div>
            <h4 className="text-sm font-mono text-blue-400 mb-6 uppercase">The Break-Even</h4>
            <p className="text-5xl font-bold text-white font-mono mb-2">13 Owners</p>
            <p className="text-zinc-400">For the clinic to completely break even on your software, they only need 13 pet owners an entire month to pay the ₹200 fee. <strong className="text-zinc-200">That is less than 1 person every two days.</strong></p>
          </div>
        </div>

        <div className="bg-zinc-900 border border-green-900/30 p-8 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h4 className="text-sm font-mono text-green-400 mb-2 uppercase">The Profit (At just 3 scans a day)</h4>
            <p className="text-zinc-400 max-w-xl">Even with terrible foot traffic, if they convert just 3 people a day (90/month), the clinic generates ₹18,000. Minus your ₹2,599 fee, they net pure, passive profit.</p>
          </div>
          <div className="text-right">
            <span className="block text-4xl font-bold text-green-400 font-mono">₹15,400+</span>
            <span className="text-zinc-500 font-mono text-sm">Net Profit / Month</span>
          </div>
        </div>
      </section>

      {/* 6 & 7. The Market Size Animation & Budget Breakdown */}
      <section ref={ringsRef} className="py-24 px-6 border-t border-zinc-800/50 bg-[#0a0a0b]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Section 6: The 3-Second Sweep Animation */}
          <div className="relative flex justify-center items-center h-[400px]">
            <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-2xl">
              {/* Blue Bullseye (18-Month Goal - 10%) */}
              <Ring radius={40} color="#3b82f6" percentage={10} isVisible={ringsVisible} />
              {/* Green (Urban SAM - 40%) */}
              <Ring radius={80} color="#22c55e" percentage={40} isVisible={ringsVisible} />
              {/* Orange (India TAM - 80%) */}
              <Ring radius={120} color="#f97316" percentage={80} isVisible={ringsVisible} />
              {/* Dim Blue (Global TAM - 100%) */}
              <Ring radius={160} color="#60a5fa" percentage={100} isVisible={ringsVisible} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className={`font-mono text-xs text-zinc-500 transition-opacity duration-1000 ${ringsVisible ? 'opacity-100' : 'opacity-0'}`}>DATA MAP</span>
            </div>
          </div>

          {/* Section 7: The Data Panel & Budget Slider */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Market Sizing & The Ask</h2>
            
            {/* Part A: The Data Map */}
            <div className="space-y-4 mb-12 font-mono text-sm">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[#60a5fa]"></div>
                <span className="text-zinc-400 w-32">Global TAM:</span>
                <span className="text-white font-bold">$1.6B+</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[#f97316]"></div>
                <span className="text-zinc-400 w-32">India TAM:</span>
                <span className="text-white font-bold">₹800 Crore</span>
                <span className="text-zinc-600 hidden md:inline">(15k+ clinics, 32M+ pets)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                <span className="text-zinc-400 w-32">Urban SAM:</span>
                <span className="text-white font-bold">₹300 Crore</span>
                <span className="text-zinc-600 hidden md:inline">(~5,000 Tier 1 & 2)</span>
              </div>
              <div className="flex items-center gap-4 border-l-2 border-blue-500 pl-4 py-2 bg-blue-500/10 -ml-4">
                <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
                <span className="text-blue-400 w-32 font-bold">18-Month Goal:</span>
                <span className="text-white font-bold">300 Clinics = ₹3 Cr ARR</span>
              </div>
            </div>

            {/* Part B: The Budget Breakdown */}
            <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-8">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Raising a $25,000 (₹20L) Micro-Seed</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between font-mono text-sm mb-1">
                    <span className="text-white font-bold">50% Decentralized Sales Engine</span>
                    <span className="text-zinc-500">₹10L</span>
                  </div>
                  <p className="text-zinc-400 text-sm">Zero CAC. Sponsoring hustle/finance influencers. They send audiences to local clinics, and I pay out a 20% commission only when a clinic officially signs up.</p>
                </div>
                
                <div>
                  <div className="flex justify-between font-mono text-sm mb-1">
                    <span className="text-white font-bold">25% Founder Runway</span>
                    <span className="text-zinc-500">₹5L</span>
                  </div>
                  <p className="text-zinc-400 text-sm">12-18 months of absolute focus. Covers living expenses in Maharashtra and a small hardware upgrade (monitor/keyboard) to maximize deployment speed.</p>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-sm mb-1">
                    <span className="text-white font-bold">15% Legal & Payouts</span>
                    <span className="text-zinc-500">₹3L</span>
                  </div>
                  <p className="text-zinc-400 text-sm">Bulletproof B2B data privacy terms, company incorporation, and the financial architecture to seamlessly pay the influencer army.</p>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-sm mb-1">
                    <span className="text-white font-bold">10% Infrastructure</span>
                    <span className="text-zinc-500">₹2L</span>
                  </div>
                  <p className="text-zinc-400 text-sm">Vercel Pro, OpenAI/Anthropic API scaling, and Google Play Console native launch fees.</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 8. The Footer / Close */}
      <section className="py-24 px-6 border-t border-zinc-800 text-center bg-[#121214]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">The backend engine is ready.</h2>
          <p className="text-zinc-400 mb-10">
            Raising ₹20L to scale the infrastructure and launch the influencer B2B sales army.
          </p>
          <a 
            href="mailto:abdulaaga09@gmail.com" 
            className="inline-block bg-white text-black font-mono font-bold text-sm px-10 py-4 rounded hover:bg-zinc-200 transition-colors"
          >
            LET'S TALK
          </a>
        </div>
      </section>
    </div>
  );
}
