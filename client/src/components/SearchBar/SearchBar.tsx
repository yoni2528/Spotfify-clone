import React from 'react';

import { IoSearchOutline } from 'react-icons/io5';
import useSpotifyRequest from '../../api/useSpotifyRequest';

let timeOut: any;

const SearchBar = () => {
  const { handleTrackSearch } = useSpotifyRequest();

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    if (keyword.length < 1) return;

    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      handleTrackSearch(keyword);
    }, 500);
  };

  return (
    <div className="relative h-10 rounded-md shadow-sm lg:w-1/4 md:w-1/3 sm:w-1/2">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <IoSearchOutline className="h-5 w-5 text-gray-700" />
      </div>
      <input
        onChange={handleSearchInput}
        className="form-input block w-full py-2 pl-10 leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-black"
        placeholder="What do you wanna listen for?"
        type="search"
      />
    </div>
  );
};

export default SearchBar;
