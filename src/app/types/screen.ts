export type Schedule = 1 | 2 | 3;

export interface Screen {
    "objectId": string,
    "name": string,
    "rows": number,
    "seatsPerRow": number,
    "projSchedule": Schedule,
    "createdAt": string,
    "updatedAt": string
}

export interface ShortScreen {
    "name": string,
    "rows": number,
    "seatsPerRow": number
}