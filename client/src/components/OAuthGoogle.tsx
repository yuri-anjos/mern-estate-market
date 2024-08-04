import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../firebase";
import { useDispatch } from "react-redux";
import { signSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuthGoogle() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	async function handleGoogleClick() {
		try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth(firebaseApp);

			const result = await signInWithPopup(auth, provider);

			const res = await fetch("/api/auth/google", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: result.user.displayName,
					email: result.user.email,
					photo: result.user.photoURL,
				}),
			});

			const data = await res.json();
			dispatch(signSuccess(data));
			navigate("/");
		} catch (error) {
			console.log("Error signing in with Google:", error);
		}
	}

	return (
		<button
			type="button"
			onClick={handleGoogleClick}
			className="bg-red-700 text-white p-3 rounded-lg  hover:bg-red-800"
		>
			Continue with Google
		</button>
	);
}
