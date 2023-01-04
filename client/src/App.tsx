import React, { useEffect } from 'react';
import Home from './pages/Home';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Search from './pages/Search';

import useSpotifyRequest from './api/useSpotifyRequest';
import PlayerSection from './components/Player/PlayerSection';
import Artist from './pages/Artist';
import Albums from './pages/Album';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import Login from './pages/Login';

const App = () => {
  const history = useLocation();
  const { handleSpotifyAccessToken } = useSpotifyRequest();

  useEffect(() => {
    const productId = new URLSearchParams(history.search).get('code');
    if (!productId) return;
    handleSpotifyAccessToken(productId);
  }, []);

  return (
    <>
      <Login />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/library" element={<Library />}></Route>
        <Route path="/artist/:id" element={<Artist />}></Route>
        <Route path="/album/:id" element={<Albums />}></Route>
        <Route path="/playlist/:id" element={<Playlist />}></Route>
        <Route path="/" element={<Navigate to={'/home'} />}></Route>
        <Route path="*" element={<Navigate to={'/home'} />}></Route>
      </Routes>
      <PlayerSection />
    </>
  );
};

export default App;
