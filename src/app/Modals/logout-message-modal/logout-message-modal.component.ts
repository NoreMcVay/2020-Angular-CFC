import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/Services';

@Component({
  selector: 'app-logout-message-modal',
  templateUrl: './logout-message-modal.component.html',
  styleUrls: ['./logout-message-modal.component.scss']
})
export class LogoutMessageModalComponent implements OnInit {
  @Input() usersFullName;

  constructor(public activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.activeModal.close();
  }

}
