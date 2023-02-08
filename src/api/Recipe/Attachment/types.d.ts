import { DMObjectData } from '@api/Topology/types';
import { StorageReference } from 'firebase/storage';

// recipes/[recipeID].attachments (Data)
export interface AttachmentsDataReference extends DMObjectData {
    attachments?: StorageReference[];
}

export interface AttachmentsDataObject extends DMObjectData {
    attachments?: Attachment[];
}

// recipes/[recipeID].attachments[attachmentIndex] (Data)
export interface AttachmentDataReference extends DMObjectData {
    name?: string;
    location?: StorageReference;
    attachmentType?: string;
}

export interface AttachmentDataObject extends DMObjectData {
    name?: string;
    location?: string; // Url of where it can be downloaded
    attachmentType?: string;
}
