import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { UserService } from "./user.service";

export const IsManagerResolver: ResolveFn<boolean> = (route) => {
    const userService = inject(UserService);
    return userService.isManager;
}

export const UserIdResolver: ResolveFn<string> = (route) => {
    const userService = inject(UserService);
    return userService.user?.objectId || '';
}