import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";

// type UpdateProfileFormState = {
// 	username: string;
// 	email: string;
// 	password: string;
// 	confirmPassword: string;
// };

export default function Profile() {
	const { currentUser } = useSelector((state: IRootState) => state.user);
	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
			<form className="flex flex-col gap-3">
				<img
					src={currentUser.avatar}
					className="self-center rounded-full w-24 h-24 object-cover cursor-pointer hover:scale-105 duration-300 hover:brightness-50"
					alt="users_avatar"
				/>
				<input
					type="text"
					placeholder="Username..."
					name="username"
					className="border p-3 rounded-lg"
				/>
				<input type="email" placeholder="Email..." name="email" className="border p-3 rounded-lg" />
				<input
					type="password"
					placeholder="Password..."
					name="password"
					className="border p-3 rounded-lg"
				/>
				<input
					type="password"
					placeholder="Confirm Password..."
					name="confirmPassword"
					className="border p-3 rounded-lg"
				/>
				<button
					type="submit"
					className="p-3 rounded-lg text-white bg-green-700 hover:bg-green-900 disabled:opacity-60 duration-300"
				>
					Update
				</button>
			</form>
			<div className="flex justify-between mt-3 p-3">
				<button type="button" className="text-red-700">
					Delete Accound
				</button>
				<button type="button" className="text-red-700">
					Sign Out
				</button>
			</div>
		</div>
	);
}
