import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "../redux/store";

export default function Header() {
	const { currentUser } = useSelector((state: IRootState) => state.user);

	return (
		<header className="w-full bg-slate-200 p-5">
			<div className="flex justify-between items-center max-w-7xl mx-auto">
				<Link to="/">
					<h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
						<span className="text-slate-500">Yuri</span>
						<span className="text-slate-700">Estate</span>
					</h1>
				</Link>

				<form className="flex items-center bg-slate-100 p-3 rounded-lg gap-x-1">
					<input
						type="text"
						placeholder="Search..."
						className="bg-transparent focus:outline-none w-24 sm:w-72"
					/>
					<FaSearch className="text-slate-600" />
				</form>

				<ul className="flex gap-4 sm:gap-6">
					<li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
						<Link to="/">Home</Link>
					</li>
					<li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
						<Link to="/about">About</Link>
					</li>
					{currentUser ? (
						<li className="text-slate-700 hover:underline cursor-pointer">
							<Link to="/profile">
								<img
									alt="users_avatar"
									src={currentUser.avatar}
									className="w-8 h-8 rounded-full object-cover"
								></img>
							</Link>
						</li>
					) : (
						<>
							<li className="text-slate-700 hover:underline cursor-pointer">
								<Link to="/signin">Signin</Link>
							</li>
							<li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
								<Link to="/signup">Signup</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</header>
	);
}
