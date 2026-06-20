import HomeNavbar from "../components/HomeNavbar";
import kiit from "../assets/kiit.jpg";

export default function Dashboard() {
  return (
    <div className="bg-white text-gray-800 overflow-hidden">

      {/* Navbar */}
      <HomeNavbar />

      {/* HERO SECTION */}
      <section
        className="relative z-0 w-full md:h-screen h-auto min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${kiit})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Glow */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">

          <p className="uppercase tracking-[6px] text-blue-400 text-sm mb-4">
            Campus Event Platform
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
            Discover.
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Connect.
            </span>
            Celebrate.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join exciting events, workshops, hackathons, and campus activities
            with one modern platform designed for students.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <button
              onClick={() => {
                document
                  .getElementById("features")
                  .scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg shadow-2xl transition duration-300 hover:scale-105"
            >
              Explore Features
            </button>

            <a
              href="/register"
              className="px-8 py-4 rounded-2xl border border-white/30 backdrop-blur-md bg-white/10 hover:bg-white/20 text-white font-semibold text-lg transition duration-300"
            >
              Create Account
            </a>
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="py-24 px-6 bg-gradient-to-b from-white to-gray-100"
      >
        <div className="max-w-6xl mx-auto text-center">

          <p className="text-blue-600 font-semibold uppercase tracking-widest">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
            Everything You Need
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            A modern event platform for students to explore opportunities,
            connect with communities, and participate effortlessly.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4">🚀</div>

              <h3 className="text-2xl font-bold mb-3">
                Fast Registration
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Register for events instantly with a smooth and modern
                experience.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4">📅</div>

              <h3 className="text-2xl font-bold mb-3">
                Smart Event Updates
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Stay informed about workshops, seminars, hackathons,
                and college programs.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2">
              <div className="text-5xl mb-4">🤝</div>

              <h3 className="text-2xl font-bold mb-3">
                Student Community
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Connect with clubs, organizers, and talented students
                around campus.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-black text-center text-white px-6 relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

        <div className="relative z-10 max-w-3xl mx-auto">

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Ready to Explore Campus Life?
          </h2>

          <p className="mt-6 text-gray-300 text-lg">
            Discover amazing opportunities, participate in exciting events,
            and become part of something bigger.
          </p>

          <a
            href="/register"
            className="inline-block mt-10 px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-2xl transition duration-300 hover:scale-105"
          >
            Get Started
          </a>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-400 text-center py-6 border-t border-gray-800">
        © 2026 EventSphere • Designed for Modern Campus Communities
      </footer>

    </div>
  );
} 