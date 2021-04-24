import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignupData } from 'src/app/shared/models/auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initialize form group.
   */
  initForm(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordTwo: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  /**
   * Send username/password to API for signing up.
   */
   submitSignup(): void {
    if (this.signupForm.valid) {
      const data: SignupData = { ...this.signupForm.value };
      this.authService.signup(data);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }


  /**
   * Validator: Both password inputs must match.
   */
  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const pw = form.get('password');
    const pw2 = form.get('passwordTwo');
    // if no error, return null
    // if passwords do not match, return object w/ prop set to true
    return pw && pw2 && pw.value && pw2.value && pw.value !== pw2.value ? { passwordMatch: true } : null;
  }


}
