export class PaginationResponseDto<T> {
    items: T[]
    nextPage?: number
    prevPage?: number

    constructor(items: T[], count: number, paginationDto: PaginationDto) {
        this.items = items

        const {offset, page, pageSize} = paginationDto

        if (count > 0 && count - page * pageSize > 0) {
            this.nextPage = page + 1
        }

        if (count - offset > 0 && page - 1 > 0) {
            this.prevPage = page - 1
        }
    }
}

export class PaginationDto {
    page: number = 1
    pageSize: number = 5

    get offset() {
        return (this.page - 1) * this.pageSize
    }
}