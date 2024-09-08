type UpdateUserDTO = {
	username: string;
	email: string;
	password?: string;
	confirmPassword?: string;
	avatar: string;
};

export default UpdateUserDTO;
