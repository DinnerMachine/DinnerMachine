import { DMObject } from '@api/Topology/Abstracts';
import {
    DocumentReference,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from 'firebase/firestore';
import { CategoryData } from './types';

export default class Category extends DMObject<CategoryData> {
    constructor(data: CategoryData, docRef?: DocumentReference | null) {
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
