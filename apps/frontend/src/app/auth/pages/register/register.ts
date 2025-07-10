import { AfterViewInit, Component, inject } from '@angular/core';
// import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements AfterViewInit {

  // private fb = inject(FormBuilder);

  // registerForm: FormGroup =  this.fb.group({
  //   email: ['', [Validators.required, Validators.email]],
  //   username: [''],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   firstName: [''],
  //   lastName: [''],
  //   title: [''],
  //   phone: [''],
  //   address: [''],
  //   apt: [''],
  //   city: [''],
  //   state: [''],
  //   zipCode: [''],
  //   country: [''],
  //   superAdmin: [false],
  //   role: [1]
  // });



  // onSubmit() {    
  //   if (this.registerForm.valid) {
  //     // Handle successful registration logic here
  //     console.log('Registration successful', this.registerForm.value);
  //   } else {
  //     // Handle form errors
  //     console.log('Form is invalid', this.registerForm.errors);
  //   }
  // }

   private fb = inject(FormBuilder);
  private auth = inject(Auth);

  phoneForm: FormGroup;
  otpSent = false;
  showPhoneForm = false;
  verificationId: string | null = null;

  constructor() {
    this.phoneForm = this.fb.group({
      phone: ['', Validators.required],
      otp: [''],
    });
  }

  ngAfterViewInit() {
  if (this.showPhoneForm) {
    this.setupRecaptcha();
  }
}

setupRecaptcha() {
   if (!this.recaptchaVerifier) {
    this.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container', this.auth.app);
  }
}

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      console.log('Google user:', result.user);
    } catch (error) {
      console.error('Google sign-in error', error);
    }
  }

 recaptchaVerifier: RecaptchaVerifier | null = null;

sendOTP() {
  if (!this.recaptchaVerifier) {
    this.recaptchaVerifier = new RecaptchaVerifier(this.auth, 'recaptcha-container', this.auth.app);
  }

  signInWithPhoneNumber(this.auth, this.phoneForm.value.phone, this.recaptchaVerifier)
    .then((result) => {
      this.verificationId = result.verificationId;
      this.otpSent = true;
    })
    .catch((error) => {
      console.error('Error sending OTP', error);
    });
}
  async verifyOTP() {
    if (!this.verificationId) return;
    const credential = PhoneAuthProvider.credential(
        this.verificationId,
      this.phoneForm.value.otp
);

    try {
      const result = await signInWithCredential(this.auth, credential);
      console.log('Phone user:', result.user);
    } catch (error) {
      console.error('OTP verification failed', error);
    }
  }
}
