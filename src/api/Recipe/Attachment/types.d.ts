import { DMObjectData } from '@api/Topology/types';
import { StorageReference } from 'firebase/storage';

// recipes/[recipeID].attachments (Data)
export type AttachmentsDataReference = DMObjectData & {
    attachments: StorageReference[];
    type: 'Attachments';
};

export type AttachmentsDataObject = DMObjectData & {
    attachments: Attachment[];
    type: 'Attachments';
};

// recipes/[recipeID].attachments[attachmentIndex] (Data)
export type AttachmentDataReference = DMObjectData & {
    name: string;
    url: string;
    attachmentType: string;
    type: 'Attachment';
};

export type AttachmentDataObject = DMObjectData & {
    name: string;
    url: string;
    attachmentType: string;
    type: 'Attachment';
};
