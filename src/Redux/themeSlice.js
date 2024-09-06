import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: () => {
        return localStorage.getItem('theme') === "dark"
    }

};


const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {
        setTheme: (state, action) => {
            state.general = action.payload;
        }
    }
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;