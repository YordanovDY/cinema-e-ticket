import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from '../shared/loader/loader.component';
import { ProjectionsComponent } from "./projections/projections.component";
import { MovieDetailsService } from './movie-details.service';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../user/user.service';
import { UserRole } from '../types/user';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [LoaderComponent, ProjectionsComponent, AsyncPipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
  providers: [
    MovieDetailsService,
    UserService
  ]
})
export class MovieDetailsComponent implements OnInit {
  get movie$() {
    return this.movieDetailsService.movie$;
  }

  get isLoading$() {
    return this.movieDetailsService.isLoading$;
  }

  // get isManager(): boolean{
  //   return this.userService.isManager;
  // }

  isManager:boolean = false;
  userId: string = '';
  
  constructor (
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService,
    // private userService: UserService
  ) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['movieId'];
    this.movieDetailsService.getSingleMovie(movieId);
    this.isManager = this.route.snapshot.data['isManager'];
    this.userId = this.route.snapshot.data['userId'];
    console.log('userId: ', this.userId);
    
  }
}
