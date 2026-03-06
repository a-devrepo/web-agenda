import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    private router = inject(Router);

    canActivate(): boolean {

        if(sessionStorage.getItem('usuario')) {
            return true;
        }
        else {
            this.router.navigate(['/pages/autenticar-usuario']);
            return false;
        }
    }
}