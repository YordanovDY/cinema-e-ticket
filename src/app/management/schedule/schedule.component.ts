import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ScheduleService } from './schedule.service';
import { MoviesService } from '../../movies/movies.service';
import { ApiService } from '../../api.service';
import { AlphabeticalArrayPipe } from '../../pipes/alphabetical-array.pipe';
import { Movie, ShortMovie } from '../../types/movie';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute } from '@angular/router';
import { TIMES_SCHEDULE } from '../../constants';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    LoaderComponent,
    AlphabeticalArrayPipe
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  providers: [ScheduleService, MoviesService, ApiService]
})
export class ScheduleComponent implements OnInit {
  form = new FormGroup({
    movie: new FormControl('', [Validators.required]),
    screen: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
  })

  movieNames: ShortMovie[] = [];

  screenSchedule: string[] = [];

  // Movies Service

  get movies$() {
    return this.moviesService.movies$;
  }

  get isMoviesLoading$() {
    return this.moviesService.isLoading$;
  }

  // Screens Service

  get screens$() {
    return this.screensService.screens$;
  }

  get isScreensLoading$() {
    return this.screensService.isLoading$;
  }

  constructor(
    private scheduleService: ScheduleService,
    private screensService: ApiService, // TODO: Change ApiService to ScreensService!
    private moviesService: MoviesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.movieNames = [];
    this.moviesService.getMovies();
    this.screensService.getScreens();

    this.movieNames = this.route.snapshot.data['movieNames'];
    console.log(this.movieNames);

  }

  isMissing(controlName: string): boolean {
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required'];
  }

  submitHandler() {
    const { movie, screen, date, time } = this.form.value;

    this.scheduleService.addProjection(
      movie as string,
      screen as string,
      date as string,
      time as string
    );

  }

  refreshTimeField(timeFieldRef: HTMLDivElement) {
    const value = this.form.get('screen')?.value

    if (!value) {
      timeFieldRef.style.display = 'none';
      return;
    }

    timeFieldRef.style.display = 'block';

    const scheduleId = value.split('@@')[3];

    if (scheduleId === '1' || scheduleId === '2' || scheduleId === '3') {
      this.screenSchedule = TIMES_SCHEDULE[scheduleId];
    }
  }
}
