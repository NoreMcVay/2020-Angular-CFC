import { Component, OnInit } from '@angular/core';
import { FetchingPlayerDataService } from '../Services/fetchingPlayerDataService.service';
import { SearchService } from '../Services/searchService.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FootballerCardModalComponent } from '../Modals/footballer-card-modal/footballer-card-modal.component';
import { AuthenticationService } from '../Services';
import { User } from '../_models';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  filteredPlayer = [];
  filteredLegend = [];
  currentUserSubscription;
  currentUser: User;


  constructor(private fetchingPlayerDataService: FetchingPlayerDataService,
              private searchService: SearchService,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService) {
              this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
                this.currentUser = user;
              });
  }

  ngOnInit() {
    this.fetchingPlayerDataService.getData().subscribe(data => {
      this.filteredPlayer = data;
    });
    this.searchService.noresSubject.subscribe(data => {
      this.filteredPlayer = data;
    });

    this.fetchingPlayerDataService.getLegendsData().subscribe(player => {
      this.filteredLegend = player;
    });
  }
  open(player) {
    const modalRef = this.modalService.open(FootballerCardModalComponent);
    modalRef.componentInstance.title =  player.fullName;
    modalRef.componentInstance.footballerData = player;
  }

}

