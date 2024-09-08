import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import FirebaseApp from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

// type UpdateProfileFormState = {
// 	username: string;
// 	email: string;
// 	password: string;
// 	confirmPassword: string;
// };

export default function Profile() {
	const fileRef = useRef<HTMLInputElement>(null);
	const { currentUser } = useSelector((state: IRootState) => state.user);
	const [file, setFile] = useState<File | undefined>(undefined);
	const [filePerc, setFilePerc] = useState<number>(0);
	const [fileUploadError, setFileUploadError] = useState<boolean>(false);
	const [avatar, setAvatar] = useState({});

	useEffect(() => {
		if (file) {
			handleFileUpdate(file);
		}
	}, [file]);

	function handleFileUpdate(file: File) {
		const storage = getStorage(FirebaseApp);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setFilePerc(Math.round(progress));
			},
			(error) => {
				setFileUploadError(true);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setAvatar(downloadURL);
				});
			}
		);
	}

	// firebase storage
	// service firebase.storage {
	//   match /b/{bucket}/o {
	//     match /{allPaths=**} {
	//       allow read;
	//       allow write: if
	//         request.resource.size < 2 * 1024 * 1024
	//         && request.resource.contentType.matches('image/.*');
	//     }
	//   }
	// }

	function showImageUploadMessage() {
		if (fileUploadError) {
			return <span className="text-red-700">Image upload failed!</span>;
		}
		if (filePerc && filePerc < 100) {
			return <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>;
		}
		if (filePerc === 100) {
			return <span className="text-green-700">Image successfully uploaded!</span>;
		}
	}

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
			<form className="flex flex-col gap-3">
				<input
					type="file"
					ref={fileRef}
					hidden
					accept="image/*"
					onChange={(e) => setFile(e.target.files?.[0])}
				/>
				<button
					type="button"
					onClick={() => fileRef.current?.click()}
					className="self-center rounded-full w-24 h-24 hover:scale-105 duration-300 hover:brightness-50"
				>
					<img
						src={avatar || currentUser.avatar}
						className="w-full h-full object-cover"
						alt="users_avatar"
					/>
				</button>
				<p className="text-sm self-center">{showImageUploadMessage()}</p>
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
					Disable Accound
				</button>
				<button type="button" className="text-red-700">
					Sign Out
				</button>
			</div>
		</div>
	);
}
