import { DateAndTime } from "./dateAndTime"
import { ShortMovie } from "./movie"
import { ShortScreen } from "./screen"

export interface Projection {
    "objectId": string,
    "movie": ShortMovie,
    "dateAndTime": DateAndTime,
    "soldTickets": string[],
    "screen": ShortScreen,
    "createdAt": string,
    "updatedAt": string
}