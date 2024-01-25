import { Photo } from "@models/albums";
import { GetAlbumsResponse } from "@models/api/albums";
import api from "./api";

export const apiGetUserAlbums = (id: number) =>
  api
    .get<GetAlbumsResponse>(`/albums/user/${id}`)
    .then((response) => response.data);

export const apiGetUserAlbumsPhotos = (id: number) =>
  api
    .get<Photo[]>(`/photos/`, {
      params: {
        album_id: id,
      },
    })
    .then((response) => response.data);

export const apiPostUserAlbum = (data: { title: string }) =>
  api.post<any>(`/albums/`, { ...data }).then((response) => response.data);

export const apiPostUserAlbumPhoto = (data: {
  title: string;
  image: File | {};
  album: number;
}) =>
  api
    .post(
      `/photos/`,
      {
        ...data,
      },
      {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
          "Content-Disposition": "form-data",
        },
      }
    )
    .then((response) => response.data);
