import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
	const { currentUser } = useSelector((state: IRootState) => state.user);

	return currentUser ? <Outlet /> : <Navigate to={"/signin"} />;
}
