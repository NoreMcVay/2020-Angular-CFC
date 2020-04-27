import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footballer-card-modal',
  templateUrl: './footballer-card-modal.component.html',
  styleUrls: ['./footballer-card-modal.component.scss']
})
export class FootballerCardModalComponent implements OnInit {
  @Input() footballerData;
  @Input() title;


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
