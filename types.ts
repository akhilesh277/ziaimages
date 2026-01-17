
export interface PhotoHuman {
  id?: number;
  name: string;
  description?: string;
  thumbnail: Blob;
  images: Blob[];
  createdAt: Date;
  updatedAt?: Date;
  schemaVersion?: number; // Future-proofing for migrations
  metadata?: Record<string, any>; // Flexible storage for future features
}

export interface Prompt {
  id?: number;
  title: string;
  content: string;
  index: number;
}
