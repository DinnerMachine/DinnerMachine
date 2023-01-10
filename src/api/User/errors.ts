import { ObjectDoesNotExistError } from '@api/Topology/errors';

export class MalformedUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MalformedUserError';
    }
}

export class UserDoesNotExistError extends ObjectDoesNotExistError {
    constructor(message: string) {
        super(message);
        this.name = 'UserDoesNotExistError';
    }
}
