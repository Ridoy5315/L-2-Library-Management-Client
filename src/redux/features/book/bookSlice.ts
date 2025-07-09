import { createSlice } from "@reduxjs/toolkit";

interface BookState {
  currentPage: number;
}

const initialState: BookState = {
  currentPage: 1,
};
export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    next: (state) => {
      state.currentPage += 1;
    },
    previous: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    goToPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { next, previous, goToPage } = bookSlice.actions;
export default bookSlice.reducer;
