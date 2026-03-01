
/*
import React from "react";
import HomeNavbar from "../components/HomeNavbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white text-gray-800">

    
    <HomeNavbar />

      <section
        className="relative h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/515439401_1932246107604510_4268272134843237956_n.jpg?stp=c0.124.750.750a_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=507b6b&_nc_eui2=AeEFTwtKKIc0MjOs9UNUeKfTJvhZGBjlOpsm-FkYGOU6mwdT6-UkQFjRIBBxh9PFxBbgs8QGEHiIZLguE-DpWZul&_nc_ohc=rZFTa6pyylIQ7kNvwGkGrfq&_nc_oc=AdmXDwLy3HDYRlS3pIYw4WnL6V5s_muvck4N_rZFwPEusEz0NFRBr6r66QF_71lzUy5Z79KnjlPBgSYtLQTcpEhT&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=X31PYTNRRjK3j8rjRItpSg&oh=00_Afu3Ovd7tu4mfGATccniTtCmPQyeP_HULJBfvtK-yjg27g&oe=699B5D0F')",
          backgroundSize: " ",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 " />
        <div className="relative  text-center max-w-3xl px-4">
          <h2 className="text-5xl font-extrabold mb-8 text-black">
            Welcome to <span className="text-blue-600">KIT Collage</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Stay updated with upcoming campus events, register easily, and grow with the community
          </p>
          <button
            onClick={() => {
              document
                .getElementById("easy-register")
                .scrollIntoView({
                  behavior: "smooth"
                });
            }}
            className="px-8 py-3 mr-2 rounded-2xl bg-black text-white text-lg font-semibold shadow-lg hover:bg-black-700">
            Get Start
          </button>
          <button className="px-8 py-3  mr-2 rounded-2xl bg-green-500 text-white text-lg font-semibold shadow-lg hover:bg-transparent-700">
            <a href="/register">Signup</a>
          </button>
        </div>
      </section>

     
      <section id="easy-register" className="py-16 px-8 bg-gray-50">
        <h3 className="text-3xl font-bold text-center mb-10">Why KIT Events?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h4 className="text-xl font-semibold mb-2">📢 Stay Updated</h4>
            <p className="text-gray-600">
              Never miss any college program, fest, or workshop.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h4 className="text-xl font-semibold mb-2">⚡ Easy Registration</h4>
            <p className="text-gray-600">
              One-click event registration with simple steps.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h4 className="text-xl font-semibold mb-2">🤝 Community</h4>
            <p className="text-gray-600">
              Connect with students, organizers, and clubs.
            </p>
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-black text-white text-center px-6">
        <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
        <p className="max-w-2xl mx-auto mb-6">
          Be part of KIT Events community to share ideas, get updates, and grow together.
        </p>
        <button className="px-8 py-3 rounded-2xl bg-white text-blue-600 font-semibold hover:bg-gray-100">
          Join Community
        </button>
      </section>

      
      <footer className="text-center py-6 text-gray-500 bg-gray-100">
        © 2026 KIT Events • Stay Connected, Stay Updated
      </footer>
    </div>

  );
}

*/


import React from "react";
import HomeNavbar from "../components/HomeNavbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* NAVBAR */}
      <HomeNavbar />

      {/* Hero Section */}
      <section
        className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://scontent.fktm3-1.fna.fbcdn.net/v/t39.30808-6/505490845_10234439338182474_2458782666158614479_n.jpg?stp=c120.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=5df8b4&_nc_eui2=AeGoWV_qqbVKjxyiSu7DEYI3QzGju4drRUpDMaO7h2tFSuBWS6C38mijN9NsVpx4g6I0XfGkF3ibsKJNzm93C-Tz&_nc_ohc=3v5ZeYUuDY8Q7kNvwGqidxx&_nc_oc=AdlHY-4AIlu-2mBiNZ8y7cYMcmEIzFA0cqPicD5d-PwTwrHJlPyut7qN77BV25IVLTRyewqjex2npUTdYvsrf5L-&_nc_zt=23&_nc_ht=scontent.fktm3-1.fna&_nc_gid=MXAUaOg0MzGJIgCe_jxePQ&oh=00_Afv_UROP-HNKIVxraYSXttukSe_2zrmJLMRww1rDajiQFQ&oe=699D0965 ')",
    
        }}
      >
        <div className="relative text-center max-w-3xl px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 md:mb-8 text-black">
            Welcome to <span className="text-blue-600">KIT Collage</span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 mb-6">
            Stay updated with upcoming campus events, register easily, and grow with the community
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                document
                  .getElementById("easy-register")
                  .scrollIntoView({
                    behavior: "smooth"
                  });
              }}
              className="px-6 md:px-8 py-2 md:py-3 rounded-2xl bg-black text-white text-base md:text-lg font-semibold shadow-lg hover:bg-gray-800"
            >
              Get Start
            </button>

            <a
              href="/register"
              className="px-6 md:px-8 py-2 md:py-3 rounded-2xl bg-green-500 text-white text-base md:text-lg font-semibold shadow-lg hover:bg-green-600"
            >
              Signup
            </a>
          </div>
        </div>
      </section>

      {/* Center Feature Section */}
      <section id="easy-register" className="py-16 px-4 md:px-8 bg-gray-50">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Why KIT Events?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h4 className="text-xl font-semibold mb-2">📢 Stay Updated</h4>
            <p className="text-gray-600">
              Never miss any college program, fest, or workshop.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h4 className="text-xl font-semibold mb-2">⚡ Easy Registration</h4>
            <p className="text-gray-600">
              One-click event registration with simple steps.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h4 className="text-xl font-semibold mb-2">🤝 Community</h4>
            <p className="text-gray-600">
              Connect with students, organizers, and clubs.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-black text-white text-center px-6">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Join Our Community
        </h3>

        <p className="max-w-2xl mx-auto mb-6 text-sm md:text-base">
          Be part of KIT Events community to share ideas, get updates, and grow together.
        </p>

        <button className="px-6 md:px-8 py-2 md:py-3 rounded-2xl bg-white text-blue-600 font-semibold hover:bg-gray-100">
          Join Community
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 bg-gray-100 text-sm md:text-base">
        © 2026 KIT Events • Stay Connected, Stay Updated
      </footer>

    </div>
  );
}
