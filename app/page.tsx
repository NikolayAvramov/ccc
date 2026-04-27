"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-full relative">
      {/* BACKGROUND IMAGE */}
      <Image
        src="/homeBG.jpeg"
        alt="Classic cars background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center">
        <div className="text-center max-w-3xl px-6 animate-[fadeInUp_1.5s_ease-out]">
          <h1
            className="text-white mt-20 font-bold leading-tight tracking-tight drop-shadow-lg 
                         text-[clamp(2.5rem,7vw,5rem)]
                         animate-[slideInFromTop_1s_ease-out_0.2s_both]"
          >
            Classic Car Center
          </h1>

          <p
            className="text-[#f3a36a] uppercase tracking-wide font-light 
                        text-[clamp(.7rem,3.5vw,1.4rem)] mt-2 mb-6
                        animate-[slideInFromTop_1s_ease-out_0.4s_both]"
          >
            Where Automotive Excellence Meets Timeless Beauty
          </p>

          <p
            className="text-white/90 leading-relaxed max-w-xl mx-auto 
                        text-[clamp(1.4rem,3vw,1.8rem)] mb-10 drop-shadow
                        animate-[slideInFromBottom_1s_ease-out_0.6s_both]"
          >
            Discover your dream classic car or showcase your prized possession.
            Connect directly with passionate enthusiasts and trusted sellers in
            our exclusive marketplace dedicated to automotive heritage.
          </p>

          <div
            className="flex flex-wrap justify-center gap-6
                          animate-[fadeInUp_1s_ease-out_0.8s_both]"
          >
            {[
              { icon: "🚗", text: "Extensive Collection" },
              { icon: "🤝", text: "Direct Connections" },
              { icon: "⭐", text: "Trusted Community" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer
                           bg-[#f3a36a] border border-[#f3a36a]
                           shadow-lg transition-all duration-300
                           hover:-translate-y-1 hover:scale-105 hover:bg-[#e28c4f]"
              >
                <span className="text-2xl animate-bounce">{item.icon}</span>
                <span className="font-semibold text-gray-800 whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInFromTop {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInFromBottom {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
