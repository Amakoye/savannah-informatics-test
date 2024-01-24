import { createDraftSafeSelector } from "@reduxjs/toolkit";

const albumStateSelector = (state: State) => state.albums;

export const selectUserAlbums = createDraftSafeSelector(
  albumStateSelector,
  (state) => {
    const albums = state.user?.albums;
    const loading = state.loading;

    return {
      albums,
      loading,
    };
  }
);

export const selectUserAlbumPhotos = createDraftSafeSelector(
  albumStateSelector,
  (state) => {
    const photos = state.user?.album?.photos;
    const loading = state.loading;

    return {
      photos,
      loading,
    };
  }
);
