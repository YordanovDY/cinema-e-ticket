import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { numberValidator } from '../../utils/validators/number.validator';
import { ratingValidator } from '../../utils/validators/rating.validator';
import { MovieDetailsService } from '../../movie-details/movie-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditMovieService } from './edit-movie.service';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css',
  providers: [MovieDetailsService, EditMovieService]
})
export class EditMovieComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    imageUrl: new FormControl(''),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    genre: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required, numberValidator()]),
    rating: new FormControl('', [Validators.required, ratingValidator()]),
    restriction: new FormControl(''),
  })

  movieId: string = ''

  get isLoading$(){
    return this.mdService.isLoading$;
  }

  constructor(
    private mdService: MovieDetailsService,
    private editMovieService: EditMovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.params['movieId'];
    this.movieId = movieId;

    this.mdService.getSingleMovie(movieId);

    this.mdService.movie$.subscribe(movie => {
      this.form.patchValue({
        title: movie?.title,
        imageUrl: movie?.imgUrl,
        description: movie?.description,
        genre: movie?.genre,
        duration: movie?.duration.toString(),
        rating: movie?.rating.toString(),
        restriction: movie?.ageRestriction,
      })
    })

  }

  isMissing(controlName:string): boolean{
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required'];
  }

  tooShort(controlName:string){
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required'];
  }

  invalidNumber(controlName:string) {
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['numberValidator'];
  }

  invalidRating(controlName:string) {
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['ratingValidator'];
  }

  submitHandler(){
    const {
      title,
      imageUrl,
      description,
      genre,
      duration,
      rating,
      restriction } = this.form.value

      this.editMovieService.editMovie(
        this.movieId,
        title as string, 
        imageUrl as string,
        description as string,
        genre as string,
        duration as string,
        rating as string,
        restriction as string
      )
      .subscribe(() => {
        this.router.navigate([`/movies/${this.movieId}`]);
      })
  }
}
