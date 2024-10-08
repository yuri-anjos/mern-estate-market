import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signFailure, signStart, signSuccess } from "../redux/user/userSlice";
import { OAuthGoogle } from "../components";
import { IRootState } from "../redux/store";

type SignInFormState = {
	email: string;
	password: string;
};

const signInInitialState: SignInFormState = {
	email: "",
	password: "",
};

export default function Signin() {
	const { loading, error } = useSelector((state: IRootState) => state.user);

	// const [loading, setLoading] = useState<boolean>(false);
	// const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState<SignInFormState>(signInInitialState);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		dispatch(signStart());
		// setLoading(true);
		const res = await fetch("/api/auth/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const data = await res.json();

		if (data.success === false) {
			// setError(data.message);
			// setLoading(false);
			dispatch(signFailure(data.message));
			return;
		}

		dispatch(signSuccess(data));
		navigate("/");
	}

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<input
					type="email"
					className="border p-3 rounded-lg"
					placeholder="Email..."
					name="email"
					value={formData.email}
					onChange={handleChange}
				/>
				<input
					type="password"
					className="border p-3 rounded-lg"
					placeholder="Password..."
					name="password"
					value={formData.password}
					onChange={handleChange}
				/>

				{error && <p className="text-red-500 my-5">{error}</p>}

				<button
					type="submit"
					disabled={loading}
					className="p-3 rounded-lg text-white bg-slate-700 hover:bg-slate-900 disabled:opacity-60 disabled:cursor-not-allowed duration-300"
				>
					{loading ? "Loading..." : "Sign In"}
				</button>

				<OAuthGoogle />
			</form>
			<p className="mt-5">
				Dont have an account?{" "}
				<Link to="/signup">
					<span className="text-blue-700 hover:underline">Sign Up</span>
				</Link>
			</p>
		</div>
	);
}
