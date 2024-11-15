import React, { useEffect, useState } from "react";

const SuperAdminApproval = () => {
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPendingAdmins = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}superadmin/sadmin/pending`
        );
        const data = await response.json();
        setPendingAdmins(data);
      } catch (err) {
        setError("Failed to fetch pending admins");
      } finally {
        setLoading(false);
      }
    };
    fetchPendingAdmins();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/superadmin/admin/update-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
        setPendingAdmins(pendingAdmins.filter((admin) => admin._id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (err) {
      setError("Failed to update status");
    }
  };

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="container mx-auto  p-2 font-primary">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Pending Admin Approvals
        </h1>
        {pendingAdmins.length === 0 ? (
          <p className="text-center text-gray-500">No pending registrations</p>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-left font-semibold">
                  Name
                </th>
                <th className="py-2 px-4 border-b text-left font-semibold">
                  Email
                </th>
                <th className="py-2 px-4 border-b text-left font-semibold">
                  Phone
                </th>
                <th className="py-2 px-4 border-b text-left font-semibold">
                  Photo
                </th>
                <th className="py-2 px-4 border-b text-left font-semibold">
                  UserID
                </th>
                <th className="py-2 px-4 border-b text-left font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingAdmins.map((admin) => (
                <tr key={admin._id}>
                  <td className="py-2 px-4 border-b">{admin.name}</td>
                  <td className="py-2 px-4 border-b">{admin.emailid}</td>
                  <td className="py-2 px-4 border-b">{admin.phonenumber}</td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={`http://localhost:3000/${admin.ownerphoto}`}
                      alt="Owner"
                      className="w-16 h-16 object-cover cursor-pointer rounded-lg hover:shadow-lg transition-all duration-700"
                      onClick={() =>
                        openImageModal(
                          `http://localhost:3000/${admin.ownerphoto}`
                        )
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{admin._id}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      onChange={(e) =>
                        handleStatusUpdate(admin._id, e.target.value)
                      }
                      className="border rounded p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Full Size"
                className="w-auto max-h-screen"
              />
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 m-4 bg-gray-200 text-black rounded-full p-2 hover:bg-gray-300 transition-all duration-200"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SuperAdminApproval;

// import React, { useEffect, useState } from "react";

// const SuperAdminApproval = () => {
//   const [pendingAdmins, setPendingAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     const fetchPendingAdmins = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_API}/superadmin/sadmin/pending`
//         );
//         const data = await response.json();
//         setPendingAdmins(data);
//       } catch (err) {
//         setError("Failed to fetch pending admins");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPendingAdmins();
//   }, []);

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API}/superadmin/admin/update-status/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status }),
//         }
//       );

//       if (response.ok) {
//         setPendingAdmins(pendingAdmins.filter((admin) => admin._id !== id));
//       } else {
//         const errorData = await response.json();
//         setError(errorData.error);
//       }
//     } catch (err) {
//       setError("Failed to update status");
//     }
//   };

//   const openImageModal = (imageSrc) => {
//     setSelectedImage(imageSrc);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="container mx-auto font-serif">
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         Pending Admin Approvals
//       </h1>
//       {pendingAdmins.length === 0 ? (
//         <p className="text-center text-gray-500">No pending registrations</p>
//       ) : (
//         <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {pendingAdmins.map((admin) => (
//             <li
//               key={admin._id}
//               className="border p-4 rounded-lg shadow-lg bg-white"
//             >
//               <p className="text-lg font-semibold">Name: {admin.name}</p>
//               <p>Email: {admin.emailid}</p>
//               <p>Phone: {admin.phonenumber}</p>
//               <img
//                 src={`http://localhost:3000/${admin.ownerphoto}`}
//                 alt="Owner Photo"
//                 className="w-32 h-32 object-cover cursor-pointer rounded-lg mt-4 hover:shadow-lg transition-all duration-200"
//                 onClick={() =>
//                   openImageModal(`http://localhost:3000/${admin.ownerphoto}`)
//                 }
//               />
//               <p>UserID: {admin._id}</p> {/* Display the userID */}
//               <div className="mt-4">
//                 <button
//                   onClick={() => handleStatusUpdate(admin._id, "approved")}
//                   className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-all duration-200"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => handleStatusUpdate(admin._id, "rejected")}
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-200"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
//           <div className="relative">
//             <img
//               src={selectedImage}
//               alt="Full Size"
//               className="w-auto max-h-screen"
//             />
//             <button
//               onClick={closeModal}
//               className="absolute top-0 right-0 m-4 bg-gray-200 text-black rounded-full p-2 hover:bg-gray-300 transition-all duration-200"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SuperAdminApproval;
