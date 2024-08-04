import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-estate-merket.firebaseapp.com",
	projectId: "mern-estate-merket",
	storageBucket: "mern-estate-merket.appspot.com",
	messagingSenderId: "67680405911",
	appId: "1:67680405911:web:fb5664d178dfbfedf4dcd2",
};

export const firebaseApp = initializeApp(firebaseConfig);
