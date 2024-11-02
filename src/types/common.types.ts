export interface PaginationResponse<T> {
    items: T[];
    nextPage?: number;
    prevPage?: number;
}

export interface Pagination {
    page: number;
    pageSize: number;
}

export interface UserCoursesPagination extends Pagination {
    userId: number;
}
