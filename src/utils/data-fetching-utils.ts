export class ResponseDataBase<T, E> {
    data: T;
    error: E;

    constructor(
        data: T,
        error: E
    ) {
        this.data = data;
        this.error = error;
    }
}

export class ResponseData<T> extends ResponseDataBase<T, ServerError> {
    skip: number = 0;
    limit: number = 0;
    total: number = 0;
};

export class ServerError extends Error {
    id: string;
    code: string;

    constructor(
        id: string,
        code: string
    ) {
        super();
        this.id = id;
        this.code = code;
    }
}

export class InternalServerError extends Error {
    statusCode: number;
    error: string;
    message: string;

    constructor(
        statusCode: number,
        error: string,
        message: string,
    ) {
        super();
        this.statusCode = statusCode
        this.error = error
        this.message = message
    }
}

export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init);
    return res.json();
}