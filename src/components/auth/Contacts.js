//import Image from "next/image";
import React from "react";
import './css/Contact.css';
const Contacts = ({ name, src, status }) => {
  return (
    <div className="contact-bar">
      {/* <Image  
        src={src}
        height={40}
        width={40}
        className="rounded-full cursor-pointer"
      /> */}
      <p className="hidden sm:inline-flex text-sm">{name}</p>
      {status === "Online" && (
        <div className="bg-green-500 h-4 w-4 rounded-full absolute left-5 bottom-2 border-2"></div>
      )}
      {status === "Offline" && (
        <div className="bg-gray-500 h-4 w-4 rounded-full absolute left-5 bottom-2 border-2"></div>
      )}
    </div>
  );
};

export default Contacts;
