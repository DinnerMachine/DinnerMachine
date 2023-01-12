import { DMObject } from '@api/Topology/Abstracts';
import { UnitDataReference } from './types';

export default class Unit extends DMObject<UnitDataReference> {
    constructor() {
        super();
    }
}
