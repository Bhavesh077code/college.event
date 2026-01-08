
import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
  });

  const [message, setMessage] = useState("");

  // input change handle
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit register form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Register successful");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md "
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Register
        </h2>

        <input
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          name="age"
          placeholder="Age"
          type="number"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>

        {message && (
          <p className="text-center mt-3 text-sm">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
