import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from './movies.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    LoaderComponent,
    RouterLink,
    PaginatorComponent,
    AsyncPipe
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  providers: [MoviesService]
})
export class MoviesComponent implements OnInit {
  get isLoading$() {
    return this.moviesService.isLoading$;
  }

  get movies$() {
    return this.moviesService.movies$;
  }

  isManager: boolean = false;
  isAdmin: boolean = false;


  constructor(
    private moviesService: MoviesService, 
    private route: ActivatedRoute
  ) { };

  ngOnInit(): void {
    this.moviesService.getMovies();
    this.isManager = this.route.snapshot.data['isManager'];
    this.isAdmin = this.route.snapshot.data['isAdmin'];
  }
}
