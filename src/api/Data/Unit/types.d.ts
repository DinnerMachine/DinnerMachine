import { DMObjectData } from '@api/Topology/types';

// system/data::Units/[unitID] (Document)
export type UnitDataReference = DMObjectData & {
    name: string;
    display: string;
    displayPlural: string;
    abbreviation: string;
    abbreviationPlural: string;
    value: number;
    unitType: string;
};

export type UnitDataObject = DMObjectData & {
    name: string;
    display: string;
    displayPlural: string;
    abbreviation: string;
    abbreviationPlural: string;
    value: number;
    unitType: string;
};
