// accommodationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAccommodation: null,
  sidebarOpened: true,
  error: null,
  loading: false,
};

const accommodationSlice = createSlice({
  name: "accommodation",
  initialState,
  reducers: {
    fetchAccommodationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAccommodationSuccess: (state, action) => {
      state.currentAccommodation = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchAccommodationFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentAccommodation = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentAccommodation = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signOutSuccess: (state) => {
      state.currentAccommodation = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    sidebarToggle: (state) => {
      state.sidebarOpened = !state.sidebarOpened;
    },
    // Add other accommodation-related actions here
  },
});

export const {
  fetchAccommodationStart,
  fetchAccommodationSuccess,
  fetchAccommodationFailure,
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  sidebarToggle,
} = accommodationSlice.actions;

export default accommodationSlice.reducer;
