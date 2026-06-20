const HomeNavbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold text-gray-900 tracking-tight"
        >
          EventHub
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">

          <a
            href="#features"
            className="hover:text-blue-600 transition"
          >
            Features
          </a>

          <a
            href="#events"
            className="hover:text-blue-600 transition"
          >
            Events
          </a>

          <a
            href="#community"
            className="hover:text-blue-600 transition"
          >
            Community
          </a>

        </div>

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
            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Sign Up
          </a>

        </div>

      </nav>
    </header>
  );
};

export default HomeNavbar;