import React from 'react';
import TrackCard from '../components/TrackCards/TrackCard';
import PageLayout from '../layout/PageLayout/PageLayout';
import { useSelector } from 'react-redux';
import ContentBlock from '../layout/ContentBlock/ContentBlock';

const Search = () => {
  const trackList = useSelector((state: any) => state.searchList.trackList);

  return (
    <PageLayout>
      <ContentBlock title="Tracks">
        <div className="grid grid-rows-1 lg:grid-cols-6 md:grid-cols-4 md:grid-cols-2 gap-8 mt-12">
          {trackList &&
            trackList.map((track: any, index: number) => {
              return (
                <TrackCard
                  artist={track.artists[0].name}
                  key={index}
                  image={track.album.images[0].url}
                  name={track.name}
                  id={track.id}
                  duration_ms={track.duration_ms}
                  artistId={track.artists[0].id}
                />
              );
            })}
        </div>
      </ContentBlock>
    </PageLayout>
  );
};

export default Search;
