import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { RegisterMessageModalComponent } from '../register-message-modal/register-message-modal.component';

@Component({
  selector: 'app-log-in-message-modal',
  templateUrl: './log-in-message-modal.component.html',
  styleUrls: ['./log-in-message-modal.component.scss']
})
export class LogInMessageModalComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private modalService: NgbModal
    ) {
        // if (this.authenticationService.currentUserValue) {
        //   this.router.navigate(['/']);
        // }
      }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  openRegisterModal() {
    const modalRef = this.modalService.open(RegisterMessageModalComponent);
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
                  this.activeModal.close();
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
