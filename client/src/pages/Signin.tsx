import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SignInFormState {
	email: string;
	password: string;
}
export default function Signin() {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState<SignInFormState>({
		email: "",
		password: "",
	});
	const navigate = useNavigate();

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);
		const res = await fetch("/api/auth/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const data = await res.json();

		if (data.success === false) {
			setLoading(false);
			setError(data.message);
			return;
		}

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
					className="bg-slate-700 text-white p-3 rounded-lg hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{loading ? "Loading..." : "Sign In"}
				</button>
				<button
					type="button"
					className="bg-red-700 text-white p-3 rounded-lg  hover:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed"
				>
					Continue with Google
				</button>
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
