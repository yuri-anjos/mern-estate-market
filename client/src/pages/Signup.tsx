import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
	return (
		<div className="p-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
			<h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
			<form className="flex flex-col gap-4">
				<input
					type="text"
					className="border p-3 rounded-lg"
					placeholder="Username..."
					id="username"
					name="username"
				/>
				<input
					type="email"
					className="border p-3 rounded-lg"
					placeholder="Email..."
					id="email"
					name="email"
				/>
				<input
					type="password"
					className="border p-3 rounded-lg"
					placeholder="********"
					id="password"
					name="password"
				/>
				<input
					type="password"
					className="border p-3 rounded-lg"
					placeholder="********"
					id="confirmPassword"
					name="confirmPassword"
				/>
				<button
					type="submit"
					className="bg-slate-700 text-white p-3 rounded-lg hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
				>
					SIGN UP
				</button>
				<button
					type="button"
					className="bg-red-700 text-white p-3 rounded-lg  hover:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed"
				>
					Continue with Google
				</button>
			</form>
			<p className="mt-5">
				Already have an account?{" "}
				<Link to="/signin">
					<span className="text-blue-700 hover:underline">Sign In</span>
				</Link>
			</p>
		</div>
	);
}
