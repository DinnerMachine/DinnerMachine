export class MalformedUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MalformedUserError";
    }
}

export class UserDoesNotExistError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserDoesNotExistError";
    }
}
