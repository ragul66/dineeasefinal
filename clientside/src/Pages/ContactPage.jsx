import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 mt-12 font-primary">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Have questions or need assistance? We’re here to help.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Send us a Message
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-400 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6">
              Feel free to reach us through the following contact details or
              visit us at our office.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10l1.5 1.5a1 1 0 001.414 0l.793-.793m6.586 6.586l-4.293 4.293a1 1 0 01-1.414 0l-.793-.793a1 1 0 000-1.414L10 13M21 10v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6m18 0a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4 4H5"
                    />
                  </svg>
                </span>
                <p>123 Main Street, Downtown, Cityname</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.172 6m0 0L15.172 7m-6.172 6H7"
                    />
                  </svg>
                </span>
                <p>support@dineease.com</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h10M3 14h10M3 18h7"
                    />
                  </svg>
                </span>
                <p>+1 234 567 890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
