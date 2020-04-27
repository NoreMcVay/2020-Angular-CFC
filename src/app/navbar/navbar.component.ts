import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from '../Services/searchService.service';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutMessageModalComponent } from '../Modals/logout-message-modal/logout-message-modal.component';
import { LogInMessageModalComponent } from '../Modals/log-in-message-modal/log-in-message-modal.component';
import { User } from '../_models';
import { AuthenticationService } from '../Services';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  filteredPlayer;
  searchField: FormControl;
  playerForm: FormGroup;
  navbarOpen = false;
  currentUserSubscription;
  currentUser: User;

  constructor(public fb: FormBuilder,
              private searchService: SearchService,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.searchField = new FormControl();
    this.playerForm = fb.group({search: this.searchField});

    this.searchField.valueChanges.pipe(
      switchMap(inputValue$ => this.searchService.search(inputValue$.toUpperCase()))
      ).subscribe(results => {
        this.filteredPlayer = results;
        this.searchService.noresSubject.next(this.filteredPlayer);
      });
  }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  openLogoutModal(usersName) {
    const modalRef = this.modalService.open(LogoutMessageModalComponent);
    modalRef.componentInstance.usersFullName = usersName.firstName;
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LogInMessageModalComponent);
  }


}
