import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from './authService';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {
  username: string = "";
  Password: string = "";

  signinForm!: FormGroup;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('accessToken') != null) {
      this._router.navigate(['/dashboard']);
    }
    this.buildSignInForm();
  }

  buildSignInForm() {
    this.signinForm = this._fb.group({
      userNamein: ['', [Validators.required]],
      Passwordin: ['', [Validators.required]]
    });
  }

  sign_in() {
    if (this.signinForm.invalid) {
      return;
    }
    const loginData = {
      username: this.username,
      password: this.Password
    };
    this.authService.login(loginData).subscribe(
      response => {
        console.log(response);
        const userData = response.user;
  
if(userData.userRole.userRoleName=="ADMIN")
  {
    localStorage.setItem("userAuth1", JSON.stringify(userData));
      const accessToken = response.accessToken;
      localStorage.setItem("accessToken1", accessToken);
      alert("connecté");
      console.log("connecté")
      this._router.navigate(['/tendences']);

  }
  else{
    alert("Login failed");
  }
      
    
    
       

     
       
      },
      error => {
        console.error("Login error", error);
        alert("Login failed");
      }
    );
  }
}