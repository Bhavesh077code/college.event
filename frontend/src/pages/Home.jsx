
import React from "react";
import TypeWriter from "../components/TypeWriter"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-red shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bol ">KIT Events</h1>
        <h1 className=" leading-tight font-size-1rem font-size-1.5rem text-3xl"> <TypeWriter words={["Welcom to Kit Event ",
          " Devloper Name ",
          " BACKEND: Bhavesh Yadav ",
          " FRONTEND: ARON MUKTAN ",
          " UI/UX Designer: Nami Aktar Khan ",
          " Memories for Lifetime "
        ]} /></h1>
        <div className="space-x-4">
          <button className="px-4 py-2 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50">
            <a href="/login">Login</a>
          </button>
          <button className="px-4 py-2 rounded-xl bg-black text-white hover:bg-black-700">
            <a href="/register">Signup</a>
          </button>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section
        className="relative h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://scontent.fktm9-2.fna.fbcdn.net/v/t39.30808-6/505490845_10234439338182474_2458782666158614479_n.jpg?stp=c120.0.720.720a_dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_eui2=AeGoWV_qqbVKjxyiSu7DEYI3QzGju4drRUpDMaO7h2tFSuBWS6C38mijN9NsVpx4g6I0XfGkF3ibsKJNzm93C-Tz&_nc_ohc=q4TxBsBC0mUQ7kNvwHbOqLr&_nc_oc=AdkROcqL-5qwGrygiAOZkYutxWiYj20Vr8drOQSj9Dacx73Zogy7Pnbv_iQHvk4KuN4&_nc_zt=23&_nc_ht=scontent.fktm9-2.fna&_nc_gid=6GF09LGhsbtmsVa_G7sx2w&oh=00_Afo7VNhmCGEKf81h7zRN9QhFm5cbvDGfMeen0SqPK_cwlg&oe=697E0E25 ')",
          backgroundSize: "cover",
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

      {/* Center Feature Section */}
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

      {/* Community Section */}
      <section className="py-16 bg-black text-white text-center px-6">
        <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
        <p className="max-w-2xl mx-auto mb-6">
          Be part of KIT Events community to share ideas, get updates, and grow together.
        </p>
        <button className="px-8 py-3 rounded-2xl bg-white text-blue-600 font-semibold hover:bg-gray-100">
          Join Community
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 bg-gray-100">
        © 2026 KIT Events • Stay Connected, Stay Updated
      </footer>
    </div>

  );
}