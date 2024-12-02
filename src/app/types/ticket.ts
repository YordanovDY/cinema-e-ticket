import { DateAndTime } from "./dateAndTime"
import { ProjectionPointer } from "./projection"
import { UserPointer } from "./user"

export interface Ticket {
    "movie": string,
    "screen": string,
    "dateAndTime": DateAndTime,
    "row": number,
    "seat": number,
    "user": UserPointer,
    "projection": ProjectionPointer,
    "ticketType": string,
    "ticketPrice": number,
    "objectId": string
  }