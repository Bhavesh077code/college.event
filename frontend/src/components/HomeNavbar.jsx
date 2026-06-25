const HomeNavbar = () => {
  // chhota circle logo for navbar
  const Logo = () => (
    <svg width="32" height="32" viewBox="0 0 400 310" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A2BE2"/>
          <stop offset="50%" stopColor="#FF006E"/>
          <stop offset="100%" stopColor="#00D4FF"/>
        </linearGradient>
      </defs>
      <circle cx="200" cy="155" r="125" fill="url(#navGrad)"/>
      <g transform="translate(12,0)">
        <path d="M 248 107 A 68 68 0 1 0 248 203 C 182 203 178 132 225 130" fill="none" stroke="white" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="225" cy="130" r="14" fill="white"/>
      </g>
    </svg>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">

        {/* Logo + Name */}
        <a href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-2xl font-extrabold tracking-tight text-gray-900">
            G<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">-Connect</span>
          </span>
        </a>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition shadow-md"
          >
            Sign Up
          </a>
        </div>

      </nav>
    </header>
  );
};

export default HomeNavbar;