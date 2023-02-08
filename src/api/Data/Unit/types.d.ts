import { DMObjectData } from '@api/Topology/types';

// system/data::Units/[unitID] (Document)
export interface UnitDataReference extends DMObjectData {
    name: string;
    display: string;
    displayPlural: string;
    abbreviation: string;
    abbreviationPlural: string;
    value: number;
    unitType: string;
}

export interface UnitDataObject extends DMObjectData {
    name: string;
    display: string;
    displayPlural: string;
    abbreviation: string;
    abbreviationPlural: string;
    value: number;
    unitType: string;
}
