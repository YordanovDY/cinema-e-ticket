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