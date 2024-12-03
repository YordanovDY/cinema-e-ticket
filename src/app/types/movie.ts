import { UserPointer } from "./user"

export interface Movie {
    objectId: string,
    title: string,
    description: string,
    genre: string,
    duration: number,
    rating: number,
    imgUrl: string,
    createdAt: string,
    updatedAt: string,
    ageRestriction: string,
    author: UserPointer
}

export interface ShortMovie {
    "id": string,
    "title": string
}