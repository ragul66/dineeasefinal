import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-orange-100 text-black py-20 px-6">
        <div className="container mx-auto text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Dineease
          </h1>
          <p className="text-lg text-gray-600 md:text-xl">
            Simplifying your dining experience with easy booking, top-notch
            services, and delightful cuisine at your favorite restaurants.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-6">
            At Dineease, we strive to make dining out as enjoyable and seamless
            as possible. We connect diners with great restaurants, providing a
            platform to easily book tables, discover new culinary experiences,
            and access exclusive offers.
          </p>
          <p className="text-lg">
            Whether you're looking for a cozy place for two or a trendy spot for
            a group celebration, Dineease is here to make your dining plans
            effortless.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-10">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Easy Reservations</h3>
              <p>
                Book a table at your favorite restaurant in just a few taps,
                anytime, anywhere.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Exclusive Offers</h3>
              <p>
                Gain access to special discounts and offers available only to
                Dineease users.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">
                Personalized Recommendations
              </h3>
              <p>
                Discover new restaurants based on your dining history and
                preferences.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">
                Real-Time Availability
              </h3>
              <p>
                See real-time table availability to help you make quick booking
                decisions.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">Seamless Payments</h3>
              <p>
                Pay easily through our app, with options to split the bill with
                friends.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">In-App Support</h3>
              <p>
                Need help? Get support from our customer service team directly
                in the app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-10">Meet Our Team</h2>
          <p className="text-lg mb-10">
            Dineease is powered by a passionate team of food lovers, developers,
            and designers, all dedicated to enhancing the dining experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="w-24 h-24 rounded-full bg-blue-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Alice Smith</h3>
              <p className="text-sm">CEO & Co-Founder</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="w-24 h-24 rounded-full bg-blue-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-sm">CTO</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="w-24 h-24 rounded-full bg-blue-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Sara Lee</h3>
              <p className="text-sm">Head of Design</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <div className="w-24 h-24 rounded-full bg-blue-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Mike Tan</h3>
              <p className="text-sm">Marketing Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="italic">
                "Dineease has changed the way I dine out. Booking a table has
                never been easier!"
              </p>
              <p className="text-sm mt-4">- Emily R.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <p className="italic">
                "I love the recommendations! I’ve discovered so many amazing
                places I wouldn’t have known otherwise."
              </p>
              <p className="text-sm mt-4">- Michael B.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-900 text-white py-16 px-6 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Discover Your Next Favorite Restaurant?
          </h2>
          <p className="text-lg mb-6">
            Join Dineease today and experience dining out like never before.
          </p>
          <button className="bg-white text-blue-900 font-semibold py-2 px-6 rounded-full transition-transform hover:scale-105">
            Download the App
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
