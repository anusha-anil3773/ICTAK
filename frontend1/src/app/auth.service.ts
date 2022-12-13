import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  server_address :string ='http://localhost:3000';
  
  constructor(private http:HttpClient) { }


login(user:any){

  return this.http.post<any>('http://localhost:3000/api/login',user);
}
loggedIn(){
  return !! localStorage.getItem('token')
}
getUserToken(){
  return localStorage.getItem('token');
}
getUser()
{
  console.log(localStorage.getItem('user_type'))
  return localStorage.getItem('user_type')
}
}

