export interface Movie {
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
  imdbID: string;
}

export interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}
