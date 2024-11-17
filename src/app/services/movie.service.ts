import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, MovieSearchResponse } from './types/movie.type';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = environment.omdbApiKey;
  private apiUrl = `https://www.omdbapi.com/`;

  private moviesSubject = new BehaviorSubject<Movie[]>([]);
  public movies$ = this.moviesSubject.asObservable();

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<MovieSearchResponse> {
    const params = new HttpParams().set('apikey', this.apiKey).set('s', query);

    return this.http
      .get<MovieSearchResponse>(this.apiUrl, { params })
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: any): Observable<MovieSearchResponse> {
    console.error('Error fetching movies:', error);
    this.moviesSubject.next([]);
    return of({ Search: [], totalResults: '0', Response: 'False' });
  }
}
