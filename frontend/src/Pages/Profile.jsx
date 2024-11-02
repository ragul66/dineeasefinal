import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Edit2,
  User,
  Save,
  X,
  Shield,
  Loader2,
  AlertCircle,
} from "lucide-react";

const ProfilePage = () => {
  const [Admins, setAdmins] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPendingAdmins = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}admin/admininfo/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch admin data");
        }
        const data = await response.json();
        setAdmins(data);
        setEditUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingAdmins();
  }, [userId]);

  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState({});

  const handleChange = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setAdmins(editUser);
    setIsEditing(false);
  };

  if (Loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (Error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600 p-6 bg-red-50 rounded-lg flex items-center space-x-2">
          <AlertCircle className="w-6 h-6" />
          <p className="text-xl">{Error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                  <img
                    src={`${import.meta.env.VITE_API}/${Admins.ownerphoto}`}
                    alt="Admin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <User className="w-6 h-6 text-blue-100" />
                  <h1 className="text-3xl font-bold text-white">
                    {Admins.name}
                  </h1>
                </div>
                <p className="mt-2 text-blue-100 flex items-center justify-center md:justify-start space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Administrator</span>
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {!isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-600 mb-2">
                      <Mail className="w-5 h-5" />
                      <p className="text-sm font-medium text-gray-500">Email</p>
                    </div>
                    <p className="mt-1 text-lg text-gray-900">
                      {Admins.emailid}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-600 mb-2">
                      <Phone className="w-5 h-5" />
                      <p className="text-sm font-medium text-gray-500">
                        Phone Number
                      </p>
                    </div>
                    <p className="mt-1 text-lg text-gray-900">
                      {Admins.phonenumber}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                    <div className="flex items-center space-x-2 text-blue-600 mb-2">
                      <MapPin className="w-5 h-5" />
                      <p className="text-sm font-medium text-gray-500">
                        Address
                      </p>
                    </div>
                    <p className="mt-1 text-lg text-gray-900">
                      {Admins.address}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-blue-700 transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 flex items-center space-x-2"
                  >
                    <Edit2 className="w-5 h-5" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editUser.name || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      name="emailid"
                      value={editUser.emailid || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>Phone</span>
                    </label>
                    <input
                      type="text"
                      name="phonenumber"
                      value={editUser.phonenumber || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>Address</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={editUser.address || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-green-700 transform transition duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// import React, { useEffect, useState } from "react";

// const ProfilePage = () => {
//   const [Admins, setAdmins] = useState(null);
//   const [Loading, setLoading] = useState(true);
//   const [Error, setError] = useState(null);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchPendingAdmins = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API}/admin/admininfo/${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch admin data");
//         }
//         const data = await response.json();
//         setAdmins(data);
//         setEditUser(data); // Initialize editUser with fetched admin data
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPendingAdmins();
//   }, [userId]);

//   // State to toggle editing mode
//   const [isEditing, setIsEditing] = useState(false);

//   // State to handle form changes
//   const [editUser, setEditUser] = useState({});

//   // Handle input change
//   const handleChange = (e) => {
//     setEditUser({
//       ...editUser,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Save changes
//   const handleSave = () => {
//     setAdmins(editUser); // Update main state with edited data
//     setIsEditing(false);
//   };

//   if (Loading) return <p>Loading...</p>;
//   if (Error) return <p>{Error}</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 font-primary">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <div className="flex flex-col md:flex-row md:space-x-6 items-center">
//           <div className="mt-4 md:mt-0 text-center md:text-left">
//             <div className="w-32 h-32">
//               <img
//                 src={`http://localhost:3000/${Admins.ownerphoto}`}
//                 alt="User"
//                 className="w-full h-full object-cover rounded-full border-4 border-blue-500"
//               />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">{Admins.name}</h2>
//             <p className="text-gray-600">{Admins.emailid}</p>
//             <p className="text-gray-600">{Admins.phonenumber}</p>
//             <p className="text-gray-600">{Admins.address}</p>
//           </div>
//         </div>

//         {/* Edit Button */}
//         {!isEditing && (
//           <div className="mt-6 text-center md:text-right">
//             <button
//               onClick={() => setIsEditing(true)}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Edit Profile
//             </button>
//           </div>
//         )}

//         {/* Edit Form */}
//         {isEditing && (
//           <div className="mt-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 font-semibold">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editUser.name || ""}
//                   onChange={handleChange}
//                   className="w-full mt-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-semibold">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="emailid"
//                   value={editUser.emailid || ""}
//                   onChange={handleChange}
//                   className="w-full mt-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-semibold">
//                   Phone
//                 </label>
//                 <input
//                   type="text"
//                   name="phonenumber"
//                   value={editUser.phonenumber || ""}
//                   onChange={handleChange}
//                   className="w-full mt-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-semibold">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={editUser.address || ""}
//                   onChange={handleChange}
//                   className="w-full mt-2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div className="mt-6 text-center md:text-right">
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Save Changes
//               </button>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="ml-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
