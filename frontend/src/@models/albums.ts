export type Album = {
  id: number;
  user: number;
  title: string;
};

export type Photo = {
  id: number;
  album: number;
  title: string;
  image: string;
  image_url: string;
};
