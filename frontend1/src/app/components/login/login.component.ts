import { Component, OnInit } from '@angular/core';
//import { AuthService } from './auth.service';
//import { Router } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={
    
    'email_id' : '',
    'password' : ''

    
  }
  message:any
  id:any

  constructor(private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {
  }
  
userverify(){
//   this.auth.loginUser(this.userform).subscribe(res=>{
//     if(res.message){
//       alert(res.message)
//     }
//     else if (res.email_id == "admin123@gmail.com" && res.password =="admin123"){
//       alert("Admin has successfully logged in")
//       this.router.navigate(['/studentslist'])

//     }
//     else{
//       alert("Staff has successfully logged in")

//       this.router.navigate(['/landingtrainer'])

//     }
//   })
  
// }


  try{
  this.auth.login(this.user).subscribe(res=>{
   console.log(res)
   if (res.adminstatus){
    localStorage.setItem('token',this.id);

      alert("Admin has successfully logged in")
      this.router.navigate(['/studentslist'])

     }
     else{
      localStorage.setItem('token',this.id);

      alert("Faculty has successfully logged in")

      this.router.navigate(['/landingtrainer'])

     }
 })
}
catch(error){
console.log(error)
}
}
}
