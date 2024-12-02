import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../user/user.service";
import { map } from "rxjs";

export const PreventDoubleLoginGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);
    const router = inject(Router);
    return userService.getProfile().pipe(
        map(user => {
            if (user) {
                console.log('User exists, blocking route');
                router.navigate(['/home']);
                return false;
            }
            console.log('No user found, allowing route');
            return true;
        })
    );
}