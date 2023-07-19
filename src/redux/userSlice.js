import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentUser: null,
	userPosts: [],
	loading: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logIn: (state, action) => {
			state.currentUser = action.payload;
		},
		logOut: state => {
			state.currentUser = null;
			state.userPosts = [];
			state.loading = false;
		},
		setPosts: (state, action) => {
			state.userPosts = action.payload;
		},
		addUserAvatar: (state, action) => {
			state.currentUser = { ...state.currentUser, userAvatar: action.payload };
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { logIn, logOut, setPosts, addUserAvatar, setLoading } =
	userSlice.actions;
export const userReducer = userSlice.reducer;
