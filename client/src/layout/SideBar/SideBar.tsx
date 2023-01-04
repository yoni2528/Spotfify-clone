import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { IoHomeOutline, IoSearchOutline, IoLibraryOutline, IoMenuOutline } from 'react-icons/io5';
import MenuItem from '../../components/SideBar/MenuItem';

const SideBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <button className="absolute z-20 right-8 top-8 sm:hidden" onClick={handleToggleMenu}>
        <IoMenuOutline className="w-8 h-8 " />
      </button>
      <div
        className={`h-48 bg-black h-[100vh] transition-all ${
          menuOpen ? 'flex absolute z-10 w-1/2' : 'hidden md:flex lg:flex w-48'
        } flex-col p-2 `}>
        <img className="w-2/3 mt-[40px]" src={logo}></img>
        <div>
          <nav>
            <ul className="list-none flex flex-col mt-12 ml-2 gap-5">
              <MenuItem title="Home" Icon={IoHomeOutline}></MenuItem>
              <MenuItem title="Search" Icon={IoSearchOutline}></MenuItem>
              <MenuItem title="Library" Icon={IoLibraryOutline}></MenuItem>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
