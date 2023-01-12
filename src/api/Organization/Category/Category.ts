import { DMObject } from '@api/Topology/Abstracts';
import {
    DocumentReference,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from 'firebase/firestore';
import { CategoryDataReference } from './types';

export default class Category extends DMObject<CategoryDataReference> {
    constructor(data: CategoryData, docRef?: DocumentReference) {
        super(data, docRef);
    }
}

export const CategoryConverter: FirestoreDataConverter<Category> = {
    toFirestore(category: Category): CategoryData {
        return category.getData();
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot<CategoryData>,
        options: SnapshotOptions,
    ): Category {
        return new Category(snapshot.data(), snapshot.ref);
    },
};
