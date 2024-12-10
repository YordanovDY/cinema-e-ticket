export enum UserRole {
    User = 'xNCf59Hyl8',
    Manager = '3fnChAmfk6',
    Admin = 'QQxCPMWz9a'
}

export interface Role {
    __type: "Pointer",
    className: "_Role",
    objectId: string
}

export interface User {
    objectId: string,
    username: string,
    email: string,
    role: Role,
    money: number,
    createdAt: string,
    updatedAt: string,
    __type: "Object",
    className: "_User",
    sessionToken: string
}

export interface UserPointer {
    __type: "Pointer",
    className: "_User",
    objectId: string
}

export interface RegistrationResponse{ 
    objectId: string,
    createdAt: string,
    sessionToken: string
}

export interface LoggingResponse {
    objectId: string,
    username:string,
    createdAt:string,
    updatedAt:string,
    sessionToken:string
  }

  export interface ReadingUserResponse{
    "username":string,
    "email":string,
    "money":number,
    "role":Role,
    "createdAt": string,
    "updatedAt": string,
    "objectId": string,
  }