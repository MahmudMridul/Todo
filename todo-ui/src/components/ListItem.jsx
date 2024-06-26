import React from "react";

export default function ListItem({ title, desc, comm, deadline }) {
   return (
      <div className="border-2 rounded-2xl p-4 border-gray-400">
         <div className="text-xl font-semibold mb-2">List Title</div>
         <div className="mb-1">
            List description. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Odio, molestiae quaerat provident qui necessitatibus
            laudantium deleniti error obcaecati maxime! Quos illum earum
            architecto molestias animi dolor consequatur debitis quae fuga.
         </div>
         <div className="text-gray-500 mb-1">
            Comment. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Odio.
         </div>
         <div className="mb-1">Deadline</div>
         <hr className="mb-4"></hr>
         <button className="w-16 p-1 bg-gray-800 rounded-md text-white font-semibold">
            Edit
         </button>
         <button className="w-16 p-1 mx-3 bg-rose-800 rounded-md text-white font-semibold">
            Delete
         </button>
      </div>
   );
}
