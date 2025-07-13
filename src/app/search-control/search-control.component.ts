import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from './search.service';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  mergeMap,
  catchError,
  tap,
  shareReplay,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-control',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-control.component.html',
  styleUrl: './search-control.component.scss',
})
export class SearchControlComponent implements OnInit {
  searchControl = new FormControl('');
  searchResults: string[] = [];
  mySubject$ = new Subject<any>();
  constructor(private searchService: SearchService, private http: HttpClient) {}
  resp$: Observable<any> | undefined;
  ngOnInit() {
    this.setupSearch();
    this.fetchData();
    // Assign the Observable directly for async pipe compatibility
    this.resp$ = this.fetchData();

    this.getApiData().subscribe({
      next: (response) => {
        this.resp$ = of(response);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetching completed');
      },
    });
  }

  private setupSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        mergeMap((query: string | null) =>
          this.searchService.searchText().pipe(
            mergeMap((users: any[]) =>
              of(
                users
                  .filter((user) =>
                    JSON.stringify(user)
                      .toLowerCase()
                      .includes((query || '').toLowerCase())
                  )
                  .map((user) => user.name)
              )
            ),
            catchError(() => of([]))
          )
        )
      )
      .subscribe((results) => {
        this.searchResults = results;
      });
  }

  private setupSearch1() {
    this.searchControl.valueChanges
      .pipe(
        //3
        debounceTime(500),
        distinctUntilChanged(),

        //2 mergemap --> inside merge map

        mergeMap(
          //1st merge map ()
          // use bracket search query string or null ==> call api pipr
          (searchQuery: string | null) =>
            this.searchService.searchText().pipe(
              //2nd mergemap, catch error
              mergeMap(
                //use bracket users ==> of bracket 3 types + map
                (users: any[]) =>
                  of(
                    users
                      .filter((user) =>
                        JSON.stringify(user)
                          .toLowerCase()
                          .includes((searchQuery || '').toLowerCase())
                      )
                      .map((user) => user.name)
                  )
              ),
              catchError(() => of([]))
            )
        )
      )
      .subscribe((res) => {
        this.searchResults = res;
      });
  }

  private setupSearch2() {
    //value change --pip --subscribe
    //3 d
    //2 merge map
    //1st merge map query and call api
    //2nd mergemap users of + lowercase + map

    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),

        debounceTime(300),

        mergeMap((A: string | null) =>
          this.searchService.searchText().pipe(
            mergeMap((B: any[]) =>
              of(
                B.filter((C) =>
                  JSON.stringify(C)
                    .toLowerCase()
                    .includes((A || '').toLowerCase())
                ).map((D) => D.name)
              )
            ),

            catchError(() => of([]))
          )
        )
      )
      .subscribe((results) => {
        this.searchResults = results;
      });
  }

  private searchControl3() {
    this.searchControl.valueChanges
      .pipe(
        //3d
        distinctUntilChanged(),
        debounceTime(300),
        //MM query -- polic call
        mergeMap((query: string | null) =>
          this.searchService.searchText().pipe(
            //filter tholochaeduckaran
            mergeMap((users: any[]) =>
              of(
                users
                  .filter((user) =>
                    JSON.stringify(user)
                      .toLowerCase()
                      .includes((query || '').toLowerCase())
                  )
                  .map((users) => users.name)
              )
            ),
            catchError(() => of([]))
          )
        )
      )
      .subscribe((response) => (this.searchResults = response));

    //amm that pipe() subscribe()
    //3 va d po d mme
    //mm querstion
    //merge map  users ooz onu kudi
  }

  private searchControl4() {
    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        mergeMap((query: string | null) =>
          this.searchService.searchText().pipe(
            mergeMap((users: any[]) =>
              of(
                users
                  .filter((user) =>
                    JSON.stringify(user)
                      .toLowerCase()
                      .includes((query || '').toLowerCase())
                  )
                  .map((user) => user.name || user.email)
              )
            ),
            catchError(() => of([]))
          )
        )
      )

      .subscribe((response) => (this.searchResults = response));
  }

  fetchData(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  getApiData(): Observable<any> {
    return this.http
      .get<any>('https://jsonplaceholder.typicode.com/posts')
      .pipe(shareReplay(1));
  }
}
