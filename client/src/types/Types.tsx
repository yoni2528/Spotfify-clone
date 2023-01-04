export type TrackCardBig = {
  artist: string;
  image: string;
};

export type TrackCardSmall = {
  artist: string;
  name: string;
  image: string;
};

export type RequestObject = {
  method: string;
  url: string;
  headers?: object;
  data?: object;
};
