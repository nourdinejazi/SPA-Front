import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../modele/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public user = new User();
  confirmPassword?: string;
  loading = false;
  myForm!: FormGroup;
  err?: string;
  constructor(
    private formBuilder: FormBuilder,
    private authSerice: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  onRegister() {
    this.loading = true;
    this.authSerice.registerUser(this.user).subscribe({
      next: (res) => {
        this.toastr.success('veillez confirmer votre email', 'Confirmation');
        this.loading = false;
        this.router.navigate(['/verifEmail']);
      },
      error: (err: any) => {
        if ((err.status = 400)) {
          this.err = err.error.message;
        }
      },
    });
  }
}
