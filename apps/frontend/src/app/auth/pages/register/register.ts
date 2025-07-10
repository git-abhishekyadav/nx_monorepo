import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private fb = inject(FormBuilder);

  registerForm: FormGroup =  this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    firstName: [''],
    lastName: [''],
    title: [''],
    phone: [''],
    address: [''],
    apt: [''],
    city: [''],
    state: [''],
    zipCode: [''],
    country: [''],
    superAdmin: [false],
    role: [1]
  });



  onSubmit() {    
    if (this.registerForm.valid) {
      // Handle successful registration logic here
      console.log('Registration successful', this.registerForm.value);
    } else {
      // Handle form errors
      console.log('Form is invalid', this.registerForm.errors);
    }
  }
}
