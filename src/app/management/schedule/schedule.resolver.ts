import { inject } from "@angular/core";
import { MoviesService } from "../../movies/movies.service";
import { ResolveFn } from "@angular/router";
import { ShortMovie } from "../../types/movie";
import { ApiService } from "../../api.service";

export const MovieNamesResolver: ResolveFn<ShortMovie[]> = (route) => {
    const moviesService = inject(MoviesService);
    const movieNames: ShortMovie[] = [];

    moviesService.getMovies();
    moviesService.movies$.subscribe(movies => {
        movies?.forEach(movie =>{
          movieNames.push({id: movie.objectId, title: movie.title});
        })
      })

      return movieNames;
}