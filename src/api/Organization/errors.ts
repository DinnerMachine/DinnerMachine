import { ObjectDoesNotExistError } from '@api/Topology/errors';

export class CategoryDoesNotExistError extends ObjectDoesNotExistError {
    constructor(message: string) {
        super(message);
        this.name = 'CategoryDoesNotExist';
    }
}
