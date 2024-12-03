import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { UserService } from "./user.service";
import { User } from "../types/user";

export const IsManagerResolver: ResolveFn<boolean> = (route) => {
    const userService = inject(UserService);
    return userService.isManager;
}

export const IsAdminResolver: ResolveFn<boolean> = (route) => {
    const userService = inject(UserService);
    return userService.isAdmin;
}

export const UserIdResolver: ResolveFn<string> = (route) => {
    const userService = inject(UserService);
    return userService.user?.objectId || '';
}

export const UserResolver: ResolveFn<User | null> = (route) => {
    const userService = inject(UserService);
    return userService.user;
}