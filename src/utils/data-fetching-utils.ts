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

};



export class ServerError {
    id: string;
    code: string;

    constructor(
        id: string,
        code: string
    ) {
        this.id = id;
        this.code = code;
    }

}

export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init);
    return res.json();
}