import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/users';

  searchText(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
