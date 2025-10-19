import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    list: [], // all categories
  },
  reducers: {
    setCategories: (state, action) => {
      state.list = action.payload;
    },
    setCategoryAndFrontImage: (state, action) => {
      state.image = action.payload.image;
      state.category = action.payload.category;
    },
  },
});

export const { setCategories, setCategoryAndFrontImage } = categorySlice.actions;
export default categorySlice.reducer;