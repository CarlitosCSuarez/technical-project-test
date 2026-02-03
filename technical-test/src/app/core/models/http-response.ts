
export interface ApiResponse<T = void> {
    message?: string;
    data?: T,
}

export interface ApiError {
    name: string;
    message: string;
}