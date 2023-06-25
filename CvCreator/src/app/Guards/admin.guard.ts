import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      
      const token = localStorage.getItem('jwt');

      const decodedToken = this.jwtHelper.decodeToken(token as string);
      const roles= decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      
      if(Array.isArray(roles) && roles.some(role => role === "Admin") || roles === "Admin")
        return true;
  
     return false;
  }
}
