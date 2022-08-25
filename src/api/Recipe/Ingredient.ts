import { DocumentReference } from "firebase/firestore";
import { DMObject } from "../Topology/Abstracts";
import { Range } from "../Topology/Data";
import { DataJSON } from "../Topology/types";

export default class Ingredient extends DMObject {
    private name: string;
    private display: string;
    private quantity: number | Range;
    private units: string;

    /**
     *
     * @param dataJSON
     * @param docRef
     */
    constructor(dataJSON: DataJSON, docRef?: DocumentReference | null) {
        super(dataJSON, docRef);

        this.name = dataJSON.name;
        this.display = dataJSON.display;
        this.quantity = dataJSON.quantity;
        this.units = dataJSON.units;
    }
}
