import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Loader2,
  MessageSquareQuote,
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("clientId");

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}user/profile/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-2 text-xl text-gray-600">Loading...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <User className="w-8 h-8 text-gray-400 mr-2" />
        <span className="text-xl text-gray-600">User not found</span>
      </div>
    );
  }

  const bookingStatuses = [
    { status: "Pending Check-In", icon: Clock, color: "text-yellow-600" },
    { status: "Pending Check-Out", icon: Calendar, color: "text-blue-600" },
    { status: "Checked Out", icon: CheckCircle2, color: "text-green-600" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-500">Premium Member</p>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-6">
        {/* Left Side - User Profile Details (reversed order in mobile) */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              Profile Details
            </h2>

            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-gray-700 font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-gray-700 font-medium">
                    {user.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-gray-700 font-medium">{user.emailid}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-700 font-medium">{user.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Booking Status and Messages (appears first in mobile) */}
        <div className="md:w-1/2 space-y-6">
          {/* Booking Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-blue-600" />
              Booking Status
            </h2>
            <div className="space-y-3">
              {bookingStatuses.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <item.icon className={`w-5 h-5 ${item.color} mr-3`} />
                    <span className="text-gray-700">{item.status}</span>
                  </div>
                  <span className="text-sm text-gray-500">Today</span>
                </div>
              ))}
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-start">
              <MessageSquareQuote className="w-8 h-8 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Welcome to Dineease
                </h3>
                <p className="text-blue-100">
                  Thank you for choosing Dineease for your bookings. We're
                  committed to providing you with a seamless and exceptional
                  dining experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
