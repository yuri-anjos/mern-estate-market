import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	currentUser: any;
	error: string | null;
	loading: boolean;
};

const initialState: UserState = {
	currentUser: null,
	error: null,
	loading: false,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signStart: (state) => {
			state.loading = true;
		},
		signSuccess: (state, action: PayloadAction<string>) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		signFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { signStart, signSuccess, signFailure } = userSlice.actions;

export default userSlice.reducer;
