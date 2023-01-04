import React from 'react';
import SideBar from '../SideBar/SideBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import useSpotifyRequest from '../../api/useSpotifyRequest';

import { useSelector } from 'react-redux';

export type Props = {
  children: React.ReactNode;
};

const PageLayout: React.FC<Props> = (props) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="bg-[#1F1F1F] h-screen w-screen overflow-y-scroll pb-[100px] ">
        <div className="h-20 bg-[#202020] flex items-center justify-between pl-12 pt-4 pr-12">
          <SearchBar />
        </div>
        <div className="animate-[fadeInRight_1s]">{props.children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
