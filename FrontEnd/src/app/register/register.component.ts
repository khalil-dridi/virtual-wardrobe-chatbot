import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PatternValidatorsService } from '../pattern-validators/pattern-validators.service';
import { ConfirmPasswordService } from '../ConfirmPassword/confirm-password.service';
import { Validators , FormGroup , FormBuilder , FormControl} from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../auth.service';
declare var $: any; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit , OnInit  {
  @ViewChild('container') container!: ElementRef;  /* Référence au conteneur principal */
  @ViewChild('signUpBtn') signUpBtn!: ElementRef;  /* Référence au bouton "Sign up" */
  @ViewChild('signInBtn') signInBtn!: ElementRef;  /* Référence au bouton "Sign in" */
  @ViewChild('password-input') passwordInput!: ElementRef;  /* Référence au champ de mot de passe */
  username : String = "" ; 
  Password : String = "" ; 

  user : User = {
    id : -1 ,
    firstName:"" , 
    lastName : "" , 
    username : "" , 
    email : "" , 
    password : "",

    
  }

  registerForm!: FormGroup;
  signinForm!: FormGroup;
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private authService : AuthService , 
  ) { } 

  ngAfterViewInit() {
    if (this.signUpBtn && this.container) {
      this.signUpBtn.nativeElement.addEventListener('click', () => {
        this.container.nativeElement.classList.add('sign-up-mode');  /* Ajoute la classe pour la transition */
      });
    }

    if (this.signInBtn && this.container) {
      this.signInBtn.nativeElement.addEventListener('click', () => {
        this.container.nativeElement.classList.remove('sign-up-mode');  /* Retire la classe pour revenir au formulaire de connexion */
      });
    }
    
   

    
  }

  ngOnInit(): void {
    if(localStorage.getItem('accessToken')!=null)
      this._router.navigate(['/account'])
    this.buildRegisterForm();
    this.buildSignInForm();
  }
  buildSignInForm(){
    this.signinForm = this._fb.group({
      userNamein : ['', [Validators.required, ]],
      Passwordin: ['', [Validators.required]],

  }
)
}
get Passwordin() {
  return this.registerForm.get('Passwordin');
}

get userNamein() {
  return this.registerForm.get('userNamein');
}
  buildRegisterForm() {
    this.registerForm = this._fb.group({
      firstName : ['', [Validators.required ]],
      lastName : ['', [Validators.required, ]],
      userName : ['', [Validators.required, ]],
    
      email: ['', [Validators.required, Validators.email]],
      
      password:['' ,
      [
        Validators.compose(
          [
            Validators.required,
            PatternValidatorsService.patternValidators(/\d/,{hasNumber:true}),
            PatternValidatorsService.patternValidators(/[A-Z]/,{hasCapitalCase:true}),
            PatternValidatorsService.patternValidators(/[a-z]/,{hasSmallCase:true}),
            PatternValidatorsService.patternValidators(/[!@#&%$*+?-[\]{};,:<>]/,{hasSpecialCharacters:true}),
            Validators.minLength(8),
          ]

        )
        
      ]
      ],
      confirm_password: [
        '' ,
      [
        Validators.compose(
          [
            Validators.required,
            PatternValidatorsService.patternValidators(/\d/,{hasNumber:true}),
            PatternValidatorsService.patternValidators(/[A-Z]/,{hasCapitalCase:true}),
            PatternValidatorsService.patternValidators(/[a-z]/,{hasSmallCase:true}),
            PatternValidatorsService.patternValidators(/[!@#&%$*+?-[\]{};,:<>]/, {hasSpecialCharacters:true}), 
                       Validators.minLength(8),
          ]

        )
        
      ]
      ],
    },{validator:ConfirmPasswordService.MatchingPAssword});
    }
    
  

  get firstName(){
    return this.registerForm.get('firstName');
  }
  get lastName(){
    return this.registerForm.get('lastName');
  }
  get userName(){
    return this.registerForm.get('userName');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirm_password() {
    return this.registerForm.get('confirm_password');
  }
 
   // form validation
   isFormValid: boolean = false;
   resolved(captchaResponse: string) {
     console.log('Resolved captcha with response: ${captchaResponse}');
 
     if (captchaResponse != null) {
       this.isFormValid = true;
     }
   }

   sign_up() {
    this.authService.sign_up(this.user).subscribe(
        newUser => {
            this.user = newUser;
            console.log("user added");
            // alert("Registered");
            this.container.nativeElement.classList.remove('sign-up-mode');
        },
        error => {
            console.error("Erreur", error);
            // Check if the error message indicates that the email or username is already taken
            if (error.status === 409 && error.error.message === 'Email or username is already taken') {
                alert("An error occurred during registration");
            } else {
                alert("Email or username is already taken");
            }
        }
    );
}

  sign_in() {
    const loginData = { username : this.username, password: this.Password };
    this.authService.login(loginData).subscribe(Response=>
      { console.log(Response);
      
        const userData = Response.user ;
        localStorage.setItem("userAuth",JSON.stringify(userData))
        const accessToken=Response.accessToken ;
        localStorage.setItem("accessToken",accessToken)

        alert("connecté");
        console.log("connecté")
        this._router.navigate(['/categorie']);
      }
    )
  }
areFieldsFilled(): boolean {
    
    return !!this.registerForm.get('name')?.value &&
           !!this.registerForm.get('lastname')?.value &&
           !!this.registerForm.get('email')?.value &&
           !!this.registerForm.get('password')?.value &&
           !!this.registerForm.get('confirm_password')?.value;
  }
}