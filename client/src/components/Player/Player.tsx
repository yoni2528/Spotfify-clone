import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setDeviceActions } from '../../store/reducers/deviceIdReducer';

import { IoPlayOutline, IoPauseOutline, IoVolumeHighOutline, IoPlayBackOutline, IoPlayForwardOutline } from 'react-icons/io5';

import { formatTimer } from '../../utils/Helper';

const NewPlayer: React.FC<{ onTrackChange: (trackObj: any) => void }> = ({ onTrackChange }) => {
  const accessToken = useSelector((state: any) => state.accessToken.accessToken);

  const dispatch = useDispatch();

  const [is_paused, setPaused] = useState(true);
  const [player, setPlayer] = useState<any>(undefined);
  const [trackTimer, setTrackTimer] = useState<any>(0);
  const [trackDuration, setTrackDuration] = useState<any>(0);

  const handleSDK = () => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = accessToken;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: (cb: any) => {
          cb(token);
        },
        volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }: any) => {
        dispatch(setDeviceActions.setDevice(device_id));
      });

      player.addListener('not_ready', ({ device_id }: any) => {
        dispatch(setDeviceActions.setDevice(device_id));
      });

      player.connect();

      player.addListener('player_state_changed', (state: any) => {
        if (!state) return;
        if (!state.context.metadata.current_item.name) return;

        onTrackChange(state.context.metadata.current_item);
        setTrackDuration(state.duration);

        if (!state.paused) {
          setPaused(false);
        }

        if (state.loading) {
          setTrackTimer(0);
          setPaused(false);
        }
      });
    };
  };

  useEffect(() => {
    if (!accessToken) return;
    handleSDK();
  }, [accessToken]);

  useEffect(() => {
    if (is_paused) return;
    const timeOut = setTimeout(() => {
      setTrackTimer(trackTimer + 1);
    }, 1000);

    if (trackTimer > trackDuration / 1000) {
      setTrackTimer(0);
      player && player.pause();
      setPaused(!is_paused);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [trackTimer, is_paused]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    player.setVolume(+e.target.value);
  };

  const handleTrackPosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackTimer(+(+e.target.value / 1000).toFixed(0));
    player.seek(+e.target.value);
  };

  const handlePlayTrack = () => {
    player.resume();
    setPaused(false);
  };
  const handleStopTrack = () => {
    player.pause();
    setPaused(true);
  };

  return (
    <div className="flex justify-end md:justify-between items-center w-full">
      <div className="flex gap-1 flex-col items-center">
        <div className="flex gap-4 items-center">
          <IoPlayBackOutline
            className="btn-spotify cursor-pointer hidden bg:flex md:flex sm:flex"
            onClick={() => {
              player.previousTrack();
              setTrackTimer(0);
            }}
          />

          {is_paused ? (
            <IoPlayOutline onClick={handlePlayTrack} className="w-8 h-8 cursor-pointer" />
          ) : (
            <IoPauseOutline onClick={handleStopTrack} className="w-8 h-8 cursor-pointer" />
          )}

          <IoPlayForwardOutline
            className="btn-spotify cursor-pointer hidden bg:flex md:flex sm:flex"
            onClick={() => {
              player.nextTrack();
              setTrackTimer(0);
            }}
          />
        </div>
        <div className="flex gap-2 items-center hidden bg:flex md:flex sm:flex">
          <p className="text-xs">{formatTimer(trackTimer)} </p>
          <input
            className="track-range"
            type="range"
            max={trackDuration}
            min={0}
            step={1}
            value={trackTimer * 1000}
            onChange={handleTrackPosition}></input>
          <p className="text-xs"> {formatTimer(+(trackDuration / 1000).toFixed(0) - trackTimer)}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center hidden lg:flex absolute right-12 ">
        <IoVolumeHighOutline className="w-6 h-6 " />
        <input
          className="volume-range"
          style={{ backgroundSize: '200px' }}
          type="range"
          max={1}
          min={0}
          step={0.1}
          defaultValue={0.5}
          onChange={handleVolumeChange}></input>
      </div>
    </div>
  );
};

export default NewPlayer;
