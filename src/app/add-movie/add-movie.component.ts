import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonFormValidatorsService } from '../utils/validators/common-form-validators.service';
import { SimpleValidator } from '../types/functions';
import { NumberDirective } from '../directives/number.directive';
import { RatingDirective } from '../directives/rating.directive';
import { UserService } from '../user/user.service';
import { AddMovieService } from './add-movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [FormsModule, NumberDirective, RatingDirective],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css',
  providers: [CommonFormValidatorsService, UserService, AddMovieService]
})
export class AddMovieComponent implements OnInit {
  userId: string = ''

  isMissing: SimpleValidator | null = null;
  tooShort: SimpleValidator | null = null;
  invalidNumber: SimpleValidator | null = null;
  invalidRating: SimpleValidator | null = null;

  constructor(
    private validator: CommonFormValidatorsService,
    private userService: UserService,
    private addMovieService: AddMovieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isMissing = this.validator.isMissing;
    this.tooShort = this.validator.tooShort;
    this.invalidNumber = this.validator.invalidNumber;
    this.invalidRating = this.validator.invalidRating;

    this.userId = this.route.snapshot.data['userId'];
    console.log('userId: ',this.userId);
    
  }

  submitHandler(form: NgForm) {
    const {
      title,
      imageUrl,
      description,
      genre,
      duration,
      rating,
      restriction } = form.value

      this.addMovieService.addMovie(this.userId,title,imageUrl,description,genre,duration,rating,restriction)
      .subscribe(() => {
        this.router.navigate(['/movies']);
      })
  }
}
