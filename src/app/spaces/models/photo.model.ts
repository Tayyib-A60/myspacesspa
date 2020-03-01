export interface Photo {
    id: number,
    fileName: string,
    userId: number,
    spaceId: number,
    isMain: boolean,
    dateCreated: Date,
    publicId: string
};