import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import useSpotifyRequest from '../../api/useSpotifyRequest';

import { useNavigate } from 'react-router-dom';
import { IoPlayCircle } from 'react-icons/io5';

import { CardItems } from './Types';

const TrackCard: React.FC<CardItems> = ({ name, image, artist, id, type, uri, artistId }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const deviceId = useSelector((state: any) => state.deviceId.deviceId);

  const { handleTrackPlay, handleAlbumPlay } = useSpotifyRequest();

  const navigate = useNavigate();

  const handleTrackSelect = () => {
    if (type === 'album' || type === 'playlist') {
      handleAlbumPlay(deviceId, uri);
    } else {
      handleTrackPlay(deviceId, [`spotify:track:${id}`]);
    }
  };

  const handleAlbumClick = () => {
    if (type === 'album') {
      navigate(`/album/${id}`);
    }
    if (type === 'playlist') {
      navigate(`/playlist/${id}`);
    }
  };

  const handleAlbumRedirect = () => {
    navigate(`/artist/${artistId}`);
  };

  const handlePlayBtnHover = () => {
    setIsVisible(true);
  };

  const handlePlayerBtnBlur = () => {
    setIsVisible(false);
  };

  const handleNameSlice = (name: string) => {
    const nameSliced = name.length > 17 ? `${name.slice(0, 14)}...` : name;
    return nameSliced;
  };

  return (
    <div
      onMouseOver={handlePlayBtnHover}
      onMouseOut={handlePlayerBtnBlur}
      className="bg-[#323232] hover:bg-[#444] transition-all duration-500 rounded-lg  p-3 text-start shadow-black relative">
      <div className="cursor-pointer  " onClick={handleAlbumClick}>
        <div className="flex flex-col gap-4 items-start justify-start text-start ">
          <div style={{ backgroundImage: `url(${image})` }} className={`bg-cover bg-center h-40 w-full rounded-lg p-4`}></div>
          <div>
            <h3 className="font-medium text-base">{handleNameSlice(name)}</h3>
            <button onClick={handleAlbumRedirect} className="font-medium text-sm mb-6 mt-1 text-[#999] hover:underline">
              {artist}
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[28%] right-[10%] shadow-black">
        <button onClick={handleTrackSelect}>
          <IoPlayCircle
            className={`w-12 h-12 hover:scale-110 transition-all shadow-black fill-[#1ED760] text-[red] color-[black] stroke-[black] ${
              isVisible ? 'visible' : 'invisible'
            } `}
          />
        </button>
      </div>
    </div>
  );
};

export default TrackCard;
