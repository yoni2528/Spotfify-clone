import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import useSpotifyRequest from '../api/useSpotifyRequest';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const Login = () => {
  const { handleSpotifyRequest } = useSpotifyRequest();
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);

  const accessToken = useSelector((state: any) => state.accessToken.accessToken);

  const handleSignIn = () => {
    setClicked(true);
    navigate('/home');
  };

  return (
    <div
      className={`${
        accessToken ? 'animate-[shrink_1s] hidden' : 'visible scale-100 '
      } absolute transition-all left-0 top-0 w-full h-full bg-[#51515131] flex items-center justify-center backdrop-blur-sm z-10`}>
      <div
        className={`${
          accessToken ? 'animate-[shrink_1s] hidden' : 'visible scale-100 '
        }w-80 h-60 bg-[white] transition-all duraion-1000 rounded-lg flex flex-col gap-4 text-left p-8 justify-center text-center items-center`}>
        <h2 className="text-2xl text-[#333] font-bold">Welcome To Spotify</h2>
        <h3 className="text-1xl text-[#333]">To start using the app you must login to sptofiy </h3>
        <a href={handleSpotifyRequest()} className="bg-[#1ED760] hover:bg-[#3af37b] px-12 py-2 rounded-lg" onClick={handleSignIn}>
          login
        </a>
      </div>
    </div>
  );
};

export default Login;
