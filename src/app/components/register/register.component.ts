import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
    })
  }

  register(){

    if(this.registerForm.valid){
      let regiserModel = Object.assign({}, this.registerForm.value);
      this.authService.register(regiserModel).subscribe(
        (response) => {
          console.log(response.message);
          window.location.href = "/login";
        },
        (responseError) =>{
          console.log(responseError.error.message);
        }
      );
    }
  }

}
