import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
 
    constructor(private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('sp_client')) {
            if (localStorage.getItem('sp_client').length > 0) {
                return true;
            }
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login', { returnUrl: state.url }]);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}