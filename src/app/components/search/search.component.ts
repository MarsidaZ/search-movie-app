import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieSearchResponse } from 'src/app/services/types/movie.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query: string = '';
  movies: any[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private movieService: MovieService) {}

  searchMovies() {
    if (this.query.trim()) {
      this.loading = true;
      this.errorMessage = '';
      this.movieService
        .searchMovies(this.query)
        .subscribe((response: MovieSearchResponse) => {
          this.loading = false;
          if (response.Response === 'True') {
            this.movies = response.Search.slice(0, 3);
          } else {
            this.errorMessage = 'No results found';
          }
        });
    }
  }
}
