
import React from "react";


const UploadEvent = () => {
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Edit Event
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            className="w-full px-4 py-2 border rounded-lg text-20xl"
          />

          <input
            type="text"
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full px-4 py-2 border rounded-lg"
          />

      

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Edit Event
          </button>
        </form>

      
      </div>
    </div>
  );
};

export default UploadEvent;

