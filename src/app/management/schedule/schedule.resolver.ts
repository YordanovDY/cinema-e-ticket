import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { ShortMovie } from "../../types/movie";
import { MoviesService } from "../../movie/movies/movies.service";

export const MovieNamesResolver: ResolveFn<ShortMovie[]> = (route) => {
    const moviesService = inject(MoviesService);
    const movieNames: ShortMovie[] = [];

    moviesService.emptyMoviesObservable();
    moviesService.getMovies();
    moviesService.movies$.subscribe(movies => {
        movies?.forEach(movie =>{
          movieNames.push({id: movie.objectId, title: movie.title});
        })
      })

      return movieNames;
}