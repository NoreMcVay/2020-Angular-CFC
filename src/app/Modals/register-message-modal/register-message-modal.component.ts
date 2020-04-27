import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/Services/user.service';
import { AlertService, AuthenticationService } from 'src/app/Services';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-message-modal',
  templateUrl: './register-message-modal.component.html',
  styleUrls: ['./register-message-modal.component.scss']
})
export class RegisterMessageModalComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private alertService: AlertService,
              public activeModal: NgbActiveModal) {

                if (this.authenticationService.currentUserValue) {
                  this.router.navigate(['/']);
              }
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    console.log(this.registerForm.value);
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            userLoginData => {
                this.alertService.success('Registration successful', true);
                this.activeModal.close();
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}


}
