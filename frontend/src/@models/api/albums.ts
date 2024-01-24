import { Album } from "@models/albums";

export type CreateAlbumPayload = {
  title: string;
};

export type GetAlbumsResponse = Album[];
