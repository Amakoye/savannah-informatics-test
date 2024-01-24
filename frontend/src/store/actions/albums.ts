import { Photo } from "@models/albums";
import { GetAlbumsResponse } from "@models/api/albums";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetUserAlbums,
  apiGetUserAlbumsPhotos,
  apiPostUserAlbum,
  apiPostUserAlbumPhoto,
} from "api/albums";
import { isAxiosError } from "axios";

export const reduxGetUserAlbums = createAsyncThunk<GetAlbumsResponse, number>(
  "GET_USER_ALBUMS",
  async (id, { rejectWithValue }) => {
    return await apiGetUserAlbums(id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue({});
    });
  }
);

export const reduxGetUserAlbumsCount = createAsyncThunk<
  GetAlbumsResponse,
  number
>("GET_USER_ALBUMS_COUNT", async (id, { rejectWithValue }) => {
  return await apiGetUserAlbums(id).catch((e) => {
    if (isAxiosError(e)) return rejectWithValue({});
  });
});

export const reduxGetUserAlbumsPhotos = createAsyncThunk<Photo[], number>(
  "GET_USER_ALBUMS_PHOTOS",
  async (id, { rejectWithValue }) => {
    return await apiGetUserAlbumsPhotos(id).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue({});
    });
  }
);

export const reduxPostUserAlbum = createAsyncThunk<any, { title: string }>(
  "POST_USER_ALBUM",
  async ({ title }, { rejectWithValue }) => {
    return await apiPostUserAlbum({ title }).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue({});
    });
  }
);

export const reduxPostUserAlbumPhoto = createAsyncThunk<
  any,
  { title: string; image: File | {}; album: number }
>(
  "POST_USER_ALBUM_PHOTO",
  async ({ title, image, album }, { rejectWithValue }) => {
    return await apiPostUserAlbumPhoto({ title, image, album }).catch((e) => {
      if (isAxiosError(e)) return rejectWithValue({});
    });
  }
);
