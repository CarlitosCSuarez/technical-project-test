
export interface ApiResponse<T> {
    message?: string;
    data?: T,
}

export interface ApiError {
    name: string;
    message: string;
}