interface ResponseError extends Error {
	statusCode?: number;
}

export default function errorHandler(statusCode: number, message: string): ResponseError {
	const error = new Error() as ResponseError;
	error.message = message;
	error.statusCode = statusCode;
	return error;
}
