
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Rocket, Brain, Video, ArrowRight, TrendingUp, MessageSquare, Star } from "lucide-react";
import Link from "next/link";

 export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Video */}
        {isBrowser && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-100 scale-105 hover:scale-100 transition-transform duration-[2s]"
            src="/1851190-uhd_3840_2160_25fps.mp4"
            autoPlay
            loop
            muted
          ></video>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 animate-slide-up">
              Where World-Changing Ideas Meet Investors in Real-Time
            </h1>
            <p className="text-2xl text-gray-300 mb-8 animate-slide-up-delayed">
              Transform your vision into reality through our revolutionary live bidding-investment platform.
              Connect directly with investors who believe in your potential,get recogintion,funding from around the World
            </p>
            <div className="flex gap-4 animate-slide-up-delayed-more">
              <button  className="group px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 relative overflow-hidden">
                <Link href={"/dashboard"}>
                
                <span className="relative z-10">Start Pitching Now</span>
               
                <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </button>
              <button className="px-8 py-4 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-black transition-colors duration-300">
              <Link href={"/dashboard"}>
                Join as an Investor
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        {isBrowser &&
          [...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[20vh] bg-gradient-to-b from-transparent via-white/20 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20vh`,
                animation: `falling ${10 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
      </div>

      {/* Features Section */}
      <div className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5"></div>
        <div className="container mx-auto px-6 relative">
          <h2 className="text-5xl font-bold text-center mb-20">Revolutionary Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, title: "Real-time Bidding", desc: "Experience live investment auctions" },
              { icon: MessageSquare, title: "Direct Communication", desc: "Connect instantly with potential investors" },
              { icon: Brain, title: "Get best investors", desc: "Get funding for your new startup" },
              { icon: Video, title: "Live Pitch Events", desc: "Showcase your vision to a global audience" }
            ].map((feature, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2">
                <feature.icon className="w-12 h-12 text-white mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-white transition-colors duration-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
       {/* Stats Section */}
       <div className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { value: "$250M+", label: "Total Investments", icon: Star },
              { value: "1,500+", label: "Successful Matches", icon: Brain },
              { value: "94%", label: "Founder Satisfaction", icon: TrendingUp },
            ].map((stat, index) => (
              <div key={index} className="p-8 bg-white/5 hover:bg-white/10">
                <stat.icon className="w-12 h-12 mx-auto mb-6" />
                <div className="text-6xl font-bold">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of innovative founders and visionary investors
            already changing the game.
          </p>
          <p className="text-2xl">
            Made by Rujal Ladhe
          </p>
        </div>
      </div>
    </div>
  );
}

