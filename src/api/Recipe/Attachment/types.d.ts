import { DMObjectData } from '@api/Topology/types';
import { StorageReference } from 'firebase/storage';

// recipes/[recipeID].attachments (Data)
export type AttachmentsDataReference = DMObjectData & {
    attachments: StorageReference[];
};

export type AttachmentsDataObject = DMObjectData & {
    attachments: Attachment[];
};

// recipes/[recipeID].attachments[attachmentIndex] (Data)
export type AttachmentDataReference = DMObjectData & {
    name: string;
    location: StorageReference;
    attachmentType: string;
};

export type AttachmentDataObject = DMObjectData & {
    name: string;
    location: string; // Url of where it can be downloaded
    attachmentType: string;
};
