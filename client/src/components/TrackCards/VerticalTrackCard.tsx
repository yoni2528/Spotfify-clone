import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectTrackActions } from '../../store/reducers/selectTrackReducer';
import useSpotifyRequest from '../../api/useSpotifyRequest';

const VerticalTrackCard: React.FC<{
  name: string;
  image?: string;
  artist: string;
  id: string;
  duration_ms: number;
  position?: number;
}> = ({ name, image, artist, id, duration_ms, position }) => {
  const dispatch = useDispatch();
  const { handleTrackPlay } = useSpotifyRequest();

  const deviceId = useSelector((state: any) => state.deviceId.deviceId);

  const handleTrackSelect = () => {
    dispatch(
      selectTrackActions.setTrack({
        name,
        image,
        artist,
        id,
        duration_ms
      })
    );
    handleTrackPlay(deviceId, [`spotify:track:${id}`]);
  };

  return (
    <div className="hover:bg-[#444] transition-all duration-500 rounded-lg overflow-hidden p-3 text-start shadow-black">
      <div onClick={handleTrackSelect} className="cursor-pointer">
        <div className="flex gap-4 items-center ">
          {image ? (
            <div style={{ backgroundImage: `url(${image})` }} className={`bg-cover bg-center w-10 h-10 rounded-lg`}></div>
          ) : (
            position
          )}
          <div>
            <h3 className=" text-base">{name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTrackCard;
