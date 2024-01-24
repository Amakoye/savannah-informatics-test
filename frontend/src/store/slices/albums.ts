import { Album, Photo } from "@models/albums";
import { createSlice } from "@reduxjs/toolkit";
import {
  reduxGetUserAlbums,
  reduxGetUserAlbumsPhotos,
  reduxPostUserAlbum,
  reduxPostUserAlbumPhoto,
} from "store/actions/albums";

type AlbumsState = {
  albums: Album[];
  loading: Loading;
  user: {
    albums: Album[];
    album: {
      photos: Photo[];
    };
  };
};

const initialState: AlbumsState = {
  albums: [],
  loading: false,
  user: {
    albums: [],
    album: {
      photos: [],
    },
  },
};

const albums = createSlice({
  name: "albums",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Get User albums
      .addCase(reduxGetUserAlbums.fulfilled, (state, { payload }) => {
        state.user = {
          ...state.user,
          albums: payload,
        };
        state.loading = false;
      })
      .addCase(reduxGetUserAlbums.pending, (state) => {
        state.loading = true;
      })
      .addCase(reduxGetUserAlbums.rejected, (state) => {
        state.loading = "error";
      })
      // Get Album photos
      .addCase(reduxGetUserAlbumsPhotos.fulfilled, (state, { payload }) => {
        state.user = {
          ...state.user,
          album: {
            photos: payload,
          },
        };
        state.loading = false;
      })
      .addCase(reduxGetUserAlbumsPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(reduxGetUserAlbumsPhotos.rejected, (state) => {
        state.loading = "error";
      })
      // Post an Album
      .addCase(reduxPostUserAlbum.fulfilled, () => {
        //do nothing
      })
      .addCase(reduxPostUserAlbum.pending, (state) => {
        state.loading = true;
      })
      .addCase(reduxPostUserAlbum.rejected, (state) => {
        state.loading = "error";
      })
      // Post an Album Photo
      .addCase(reduxPostUserAlbumPhoto.fulfilled, () => {
        //do nothing
      })
      .addCase(reduxPostUserAlbumPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(reduxPostUserAlbumPhoto.rejected, (state) => {
        state.loading = "error";
      });
  },
});

export default albums.reducer;
