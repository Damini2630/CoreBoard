// "use client";
// import { useDashboard } from "../../context/DashboardContext";
// import React, { useState } from "react";
// import Toast from "../../components/Toast";
// import Link from "next/link";

// export default function BookmarksPage() {
//   const { users, bookmarks, toggleBookmark, promoteEmployee, promoted } = useDashboard();
//   const [showToast, setShowToast] = useState(false);
//   const handlePromote = (id) => {
//     promoteEmployee(id);
//     setShowToast(true);
//   };

//   const bookmarkedUsers = users.filter((u) => bookmarks.includes(u.id));

//   if (bookmarkedUsers.length === 0) {
//     return <div className="p-6 text-gray-600">No bookmarks found.</div>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-black">Bookmarked Employees</h1>
//       <div className="grid md:grid-cols-2 gap-4">
//         {bookmarkedUsers.map((user) => (
//           <div key={user.id} className="border rounded p-4 shadow">
//             <h2 className="text-lg font-semibold text-black">{user.firstName} {user.lastName}</h2>
//             <p>{user.email} | Dept: {user.department}</p>

//             <div className="flex gap-2 mt-3">
//               <Link href={/employee/${user.id}} className="text-blue-500 hover:underline">View</Link>
//               <button onClick={() => toggleBookmark(user.id)} className="text-red-500 hover:underline">
//                 Remove Bookmark
//               </button>
//               <Toast message="Employee Promoted!" show={showToast} />
//               <button onClick={() => handlePromote(user.id)} className="text-green-600 hover:underline">
//                 {promoted.includes(user.id) ? "Promoted ✅" : "Promote"}
//               </button>
//               <button className="text-indigo-500 hover:underline">Assign to Project</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";
import { useDashboard } from "../../context/DashboardContext";
import React from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function BookmarksPage() {
  const { users, bookmarks, toggleBookmark, promoteEmployee, promoted } = useDashboard();

  const handlePromote = (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to promote ${name}?`);
    if (confirmed) {
      promoteEmployee(id);
      toast.success(`${name} has been promoted!`, {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
      });
    }
  };

  const handleUnbookmark = (id, name) => {
    toggleBookmark(id);
    toast.info(`${name} removed from bookmarks.`, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
    });
  };

  const bookmarkedUsers = users.filter((u) => bookmarks.includes(u.id));

  if (bookmarkedUsers.length === 0) {
    return <div className="p-6 text-gray-600">No bookmarks found.</div>;
  }

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-black mb-4">Bookmarked Employees</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {bookmarkedUsers.map((user) => (
          <div key={user.id} className="border rounded p-4 shadow">
            <h2 className="text-lg font-semibold text-black">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-black">{user.email} | Dept: {user.department}</p>

            <div className="flex gap-2 mt-3">
              <Link href={`/employee/${user.id}`} className="text-blue-500 hover:underline">
                View
              </Link>
              <button
                onClick={() => handleUnbookmark(user.id, `${user.firstName} ${user.lastName}`)}
                className="text-red-500 hover:underline"
              >
                Remove Bookmark
              </button>
              <button
                onClick={() => handlePromote(user.id, `${user.firstName} ${user.lastName}`)}
                className="text-green-600 hover:underline"
              >
                {promoted.includes(user.id) ? "Promoted ✅" : "Promote"}
              </button>
              <button className="text-indigo-500 hover:underline">Assign to Project</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

