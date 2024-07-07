export declare class ApiResponse<T = unknown> {
    readonly timeStamp?: Date;
    readonly code?: number;
    readonly status?: boolean;
    readonly message?: string;
    readonly data?: T[];
    constructor(timeStamp?: Date, code?: number, status?: boolean, message?: string, data?: T[]);
    static create<E = unknown>(req: Partial<Omit<ApiResponse<E>, 'timeStamp'>>): ApiResponse<E>;
}
