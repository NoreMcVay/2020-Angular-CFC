import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class FetchingPlayerDataService {
private dataUrl;

  constructor(private http: HttpClient) {
    this.dataUrl = `http://localhost:4200/assets`;
  }

  getData() {
    return this.http.get<[]>(`${this.dataUrl}/local.json`);
  }

  getLegendsData() {
      return this.http.get<[]>(`${this.dataUrl}/legends.json`);
  }

}
