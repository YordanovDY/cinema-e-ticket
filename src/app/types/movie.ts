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
    ageRestriction: string
}

export interface ShortMovie {
    "id": string,
    "title": string
}