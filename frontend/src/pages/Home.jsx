import HomeNavbar from "../components/HomeNavbar";

// G-Connect Circle Logo (inline SVG)
const GLogo = () => (
  <svg width="160" height="160" viewBox="0 0 400 310" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A2BE2"/>
        <stop offset="50%" stopColor="#FF006E"/>
        <stop offset="100%" stopColor="#00D4FF"/>
      </linearGradient>
      <linearGradient id="gInner" x1="75" y1="30" x2="325" y2="280">
        <stop offset="0%" stopColor="#8A2BE2"/>
        <stop offset="50%" stopColor="#FF006E"/>
        <stop offset="100%" stopColor="#00D4FF"/>
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="14" stdDeviation="26" floodColor="#8A2BE2" floodOpacity="0.18"/>
      </filter>
    </defs>
    <circle cx="200" cy="155" r="125" fill="url(#gGradient)" filter="url(#softShadow)"/>
    <g transform="translate(12,0)">
      <path d="M 248 107 A 68 68 0 1 0 248 203 C 182 203 178 132 225 130" fill="none" stroke="white" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="225" cy="130" r="14" fill="white"/>
      <circle cx="225" cy="130" r="5.5" fill="url(#gInner)"/>
    </g>
  </svg>
);

export default function Dashboard() {
  return (
    <div className="bg-black text-white overflow-hidden">

      <HomeNavbar />

      {/* SPLASH HERO */}
      <section className="relative w-full h-screen flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-black"></div>

        {/* Glow effects - TikTok/Insta vibe */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-10"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 flex flex-col items-center">

          <GLogo />

          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight">
            G-Connect
          </h1>

          <p className="mt-3 text-lg md:text-xl text-gray-400 tracking-[4px] uppercase">
            Discover. Connect. Celebrate.
          </p>

          <p className="mt-6 text-gray-300 max-w-xl text-base md:text-lg">
           
          </p>

          

          <button
            onClick={() => document.getElementById("features")?.scrollIntoView({behavior: "smooth"})}
            className="mt-12 text-gray-500 hover:text-white text-sm animate-bounce"
          >
            ↓ Explore More
          </button>
        </div>
      </section>

      <footer className="bg-black text-gray-500 text-center py-6 border-t border-gray-800">
        © 2026 G-Connect • Made for Creators
      </footer>
    </div>
  );
}