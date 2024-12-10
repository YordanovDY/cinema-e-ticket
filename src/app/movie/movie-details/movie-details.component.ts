import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieDetailsService } from './movie-details.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ProjectionsComponent } from './projections/projections.component';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [LoaderComponent, ProjectionsComponent, AsyncPipe, RouterLink],
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

  isManager:boolean = false;
  isAdmin:boolean = false;
  userId: string = '';
  movieId: string = '';

  constructor (
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['movieId'];
    this.movieDetailsService.getSingleMovie(movieId);
    this.movieId = movieId;
    this.isManager = this.route.snapshot.data['isManager'];
    this.isAdmin = this.route.snapshot.data['isAdmin'];
    this.userId = this.route.snapshot.data['userId'];
  }

  onDelete(){
    const confirmation = window.confirm('Are you sure?');

    if(!confirmation){
      return;
    }

    this.movieDetailsService.deleteMovie(this.movieId).subscribe(() =>{
      this.router.navigate(['/movies']);
    })
    
  }
}
