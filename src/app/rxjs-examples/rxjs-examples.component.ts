import { Component, OnInit } from '@angular/core';
import { FetchingPlayerDataService } from '../Services/fetchingPlayerDataService.service';
import { forkJoin, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-examples',
  templateUrl: './rxjs-examples.component.html',
  styleUrls: ['./rxjs-examples.component.scss']
})
export class RxjsExamplesComponent implements OnInit {
  SpainArray = [];
  EngArray = [];


  constructor(private fetchingPlayerDataService: FetchingPlayerDataService) { }

  ngOnInit() {

    const playerStream1$ = this.fetchingPlayerDataService.getData();
    const playerStream2$ = this.fetchingPlayerDataService.getLegendsData();
    const joinPlayers = forkJoin([playerStream1$, playerStream2$])
    .pipe(
      map(
        ([Stream1, Stream2]) => [...Stream1, ...Stream2]
      )
    ).subscribe(fullPlayers => {
        this.SpainArray = fullPlayers.filter((player: any) => player.country === 'Spain');
        console.log('ESP', this.SpainArray);
    });

    const pstream1$ = this.fetchingPlayerDataService.getData();
    const pstream2$ = this.fetchingPlayerDataService.getLegendsData();
    const combinePlayers = combineLatest([pstream1$, pstream2$])
    .pipe(
      map(
        ([players1, players2]) => [...players1, ...players2]
      )
    ).subscribe(data => {
      this.EngArray = data.filter((player: any) => player.country === 'England');
      console.log('ENG', this.EngArray);
    });

  }

}
