// import {  Component, ElementRef, inject, ViewChild } from '@angular/core';
// import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Auth, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth';
// import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private fb = inject(FormBuilder);
  // private auth = inject(Auth);
  private authSerice = inject(Auth);

  registerForm: FormGroup =  this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {    
    if (this.registerForm.valid) {
      // Handle successful registration logic here
      console.log('Registration successful', this.registerForm.value);
      this.authSerice.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          console.log('Registration response:', response);
          // Handle successful registration response
        },
        error: (error: any) => {
          console.error('Registration error:', error);
          // Handle registration error
        }
      });
      // You can also reset the form if needed
      this.registerForm.reset();
    } else {
      // Handle form errors
      console.log('Form is invalid', this.registerForm.errors);
    }
  }

//   @ViewChild('recaptchaContainer', { static: false }) recaptchaContainer: ElementRef = inject(ElementRef);
//   phoneForm: FormGroup;
//   otpSent = false;
//   showPhoneForm = false;
//   verificationId: string | null = null;
// recaptchaVerifier?: RecaptchaVerifier;

//   constructor() {
//     this.phoneForm = this.fb.group({
//       phone: ['', Validators.required],
//       otp: [''],
//     });
//   }


//   async signInWithGoogle() {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(this.auth, provider);
//       console.log('Google user:', result.user);
//     } catch (error) {
//       console.error('Google sign-in error', error);
//     }
//   }

//  ngAfterViewInit() {
//     if (this.recaptchaContainer) {
//     this.setupReCAPTCHA();
//   } else {
//     console.error('reCAPTCHA container not found!');
//   }
//   }

//  setupReCAPTCHA() {
//     if (!this.recaptchaVerifier) {
//       this.recaptchaVerifier = new RecaptchaVerifier(
//         this.auth,
//         this.recaptchaContainer.nativeElement,
//         {
//           size: 'normal',
//           callback: (response: any) => {
//             console.log('reCAPTCHA solved:', response);
//           }
//         }
//       );
//       this.recaptchaVerifier.render();
//     }
//   }

//   async sendOTP() {
//     this.showPhoneForm = true;
//     try {
//       const result = await signInWithPhoneNumber(
//         this.auth,
//         this.phoneForm.value.phone,
//         this.recaptchaVerifier
//       );
//       this.verificationId = result.verificationId;
//       this.otpSent = true;
//       console.log('OTP sent:', result.verificationId);
//     } catch (error) {
//       console.error('Failed to send OTP', error);
//     }
//   }

//   async verifyOTP() {
//     if (!this.verificationId) return;
//     const credential = PhoneAuthProvider.credential(
//         this.verificationId,
//       this.phoneForm.value.otp
// );

//     try {
//       const result = await signInWithCredential(this.auth, credential);
//       console.log('Phone user:', result.user);
//     } catch (error) {
//       console.error('OTP verification failed', error);
//     }
//   }
}
