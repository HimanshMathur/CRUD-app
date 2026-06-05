import React from "react";
import logo from "./logo.png";
const navbar = () => {
  return (
    <div className="w-full flex justify-between h-20 items-center bg-gray-200 shadow px-5">
      <div>
        <img src={logo} alt="Book Manager Logo" className="h-34 w-auto" />
      </div>
      <div className="w-[50%] h-full">
        <ul className="w-full h-full flex gap-6 list none items-center  text-zinc-800 font-medium">
          <li className="cursor-pointer">HOME</li>
          <li className="cursor-pointer">ABOUT</li>
          <li className="cursor-pointer">CONTACT</li>
        </ul>
      </div>
    </div>
  );
};

export default navbar;
