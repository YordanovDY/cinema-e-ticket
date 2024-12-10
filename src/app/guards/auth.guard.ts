import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserService } from "../user/user.service";

export const AuthGuard: CanActivateFn = (route, state) =>{
    const userService = inject(UserService);
    const router = inject(Router);
    const isLoggedIn = userService.isLogged;
    const url = state.url;
    
    if(!isLoggedIn) {

        if(url === '/contacts'){
            router.navigate(['/login']);

        } else{
            router.navigate(['/no-access']);
        }
    }

    return isLoggedIn;
}