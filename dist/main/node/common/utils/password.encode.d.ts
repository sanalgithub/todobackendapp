export declare class PasswordEncoder {
    constructor();
    encode(password: string): Promise<string>;
    matches(hash: string, raw: string): Promise<boolean>;
}
