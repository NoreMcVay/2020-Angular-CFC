import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class SearchService {
  private dataUrl;
  noresSubject = new Subject<any>();

  constructor(private http: HttpClient) {
    this.dataUrl = `http://localhost:4200/assets/local.json`;
  }


  search(inputVal: string) {
    return this.http.get<[]>(`${this.dataUrl}`)
        .pipe(
            map((arrayPlayer$) => arrayPlayer$.filter((arrayPlayer: any) => arrayPlayer.fullName.includes(inputVal)))
        );
  }
}
