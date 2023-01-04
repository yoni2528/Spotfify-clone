import useRequest from './useRequest';

import { accessTokenActions } from '../store/reducers/accessTokenReducer';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { searchListActions } from '../store/reducers/searchListReducer';

import { useNavigate } from 'react-router-dom';
import { BASE_URL, CLIENT_ID } from '../data/Static';
const useSpotifyRequest = () => {
  const { handleRequest, handlePutRequest } = useRequest();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state: any) => state.accessToken.accessToken);

  const handleSpotifyRequest = () => {
    const scope =
      'user-read-private%20user-read-email%20user-modify-playback-state%20user-read-playback-state%20streaming%20user-follow-read%20user-follow-modify%20user-top-read%20user-read-recently-played';
    const redirect_uri = BASE_URL;
    const client_id = CLIENT_ID;
    const link = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}`;
    return link;
  };

  const handleSpotifyAccessToken = async (token: string) => {
    const data = await handleRequest({
      url: `http://127.0.0.1:3000/app/v1/spotify?token=${token}`,
      method: 'GET'
    });
    if (!data) return;

    const tokenData = data.data.accessToken;

    dispatch(
      accessTokenActions.setToken({
        accessToken: tokenData.access_token,
        expire: tokenData.expires_in,
        refreshToken: tokenData.refresh_token
      })
    );
  };

  const handleTrackSearch = async (keyword: string) => {
    const data = await handleRequest({
      method: 'GET',
      url: `https://api.spotify.com/v1/search?q=${keyword}&type=track`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const tokenList = data?.data.tracks.items;
    if (!tokenList) return;

    dispatch(searchListActions.setList(tokenList));
    navigate('/search');

    return data;
  };

  const handleTrackPlay = async (deviceId: any, urisList: any) => {
    const data = await handlePutRequest({
      method: 'PUT',
      url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        uris: urisList
      }
    });

    if (!data) return;

    return data;
  };

  const handleGetUserPlaylist = async () => {
    const artistData = await handleRequest({
      method: 'GET',
      url: `https://api.spotify.com/v1/me/following?type=artist`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const recentTracks = await handleRequest({
      method: 'GET',
      url: `https://api.spotify.com/v1/me/player/recently-played`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const userDetails = await handleRequest({
      method: 'GET',
      url: `https://api.spotify.com/v1/me`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (!userDetails?.data) return;

    const userPlaylist = await handleRequest({
      method: 'GET',
      url: `https://api.spotify.com/v1/users/${userDetails.data.id}/playlists`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!userPlaylist) return;

    if (!artistData?.data) return;

    return {
      artists: artistData.data,
      tracks: recentTracks?.data.items,
      playlists: userPlaylist.data.items
    };
  };

  const handleGetArtistData = async (artistId: string) => {
    const artistTracks = await handleRequest({
      method: 'GET',
      url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=IL`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const artist = await handleRequest({
      method: 'GET',
      url: `https://api.spotify.com/v1/artists/${artistId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const artistAlbums = await handleRequest({
      method: 'GET',
      url: `https://api.spotify.com/v1/artists/${artistId}/albums`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!artist || !artistTracks) return;

    return {
      tracks: artistTracks?.data.tracks,
      artist: artist.data,
      albums: artistAlbums?.data.items
    };
  };

  const handleAlbumPlay = async (deviceId: any, contextUri: any) => {
    const data = await handlePutRequest({
      method: 'PUT',
      url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      data: {
        context_uri: contextUri,
        offset: {
          position: 5
        },
        position_ms: 0
      }
    });

    if (!data) return;

    return data;
  };

  const handleGetAlbumData = async (albumId: string) => {
    const album = await handleRequest({
      method: 'GET',
      url: `https://api.spotify.com/v1/albums/${albumId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    const albumTracks = await handleRequest({
      method: 'GET',
      url: `https://api.spotify.com/v1/albums/${albumId}/tracks`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!album || !albumTracks) return;

    return { album: album.data, tracks: albumTracks.data.items };
  };

  const handleGetPlaylist = async (playlistId: string) => {
    const playlistData = await handleRequest({
      method: 'GET',
      url: `https://api.spotify.com/v1/playlists/${playlistId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!playlistData) return;
    return playlistData.data;
  };

  return {
    handleSpotifyRequest,
    handleSpotifyAccessToken,
    handleTrackSearch,
    handleTrackPlay,
    handleGetUserPlaylist,
    handleGetArtistData,
    handleAlbumPlay,
    handleGetAlbumData,
    handleGetPlaylist
  };
};

export default useSpotifyRequest;
