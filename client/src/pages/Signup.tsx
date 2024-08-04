import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OAuthGoogle } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { signFailure, signStart, signSuccess } from "../redux/user/userSlice";

interface SignUpFormState {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const signUpInitialState: SignUpFormState = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export default function Signup() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { loading, error } = useSelector((state: any) => state.user);

	// const [loading, setLoading] = useState<boolean>(false);
	// const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState<SignUpFormState>(signUpInitialState);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			dispatch(signFailure("Passwords do not match"));
			// setError("Passwords do not match");
			return;
		}

		dispatch(signStart());
		// setLoading(true);
		const res = await fetch("/api/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		const data = await res.json();

		if (data.success === false) {
			// setLoading(false);
			// setError(data.message);
			dispatch(signFailure(data.message()));
			return;
		}

		dispatch(signSuccess(data));
		navigate("/");
	}

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<input
					type="text"
					className="border p-3 rounded-lg"
					placeholder="Username..."
					name="username"
					value={formData.username}
					onChange={handleChange}
				/>
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
				<input
					type="password"
					className="border p-3 rounded-lg"
					placeholder="Confirm Password..."
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={handleChange}
				/>

				{error && <p className="text-red-500 my-5">{error}</p>}

				<button
					type="submit"
					disabled={loading}
					className="bg-slate-700 text-white p-3 rounded-lg hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
				>
					{loading ? "Loading..." : "Sign Up"}
				</button>
				<OAuthGoogle />
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
