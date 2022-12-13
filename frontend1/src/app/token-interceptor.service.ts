import { Injectable,Injector } from '@angular/core';
import { AuthService } from './auth.service';
//import { Router } from '@angular/router';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private auth:AuthService) { }
  intercept(req:HttpRequest<any>,nxt:HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getUserToken()
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `${token}` }
      })
    }

    return nxt.handle(req);
  }
}
