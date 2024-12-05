import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ShortMovie } from '../../types/movie';
import { ShortScreen } from '../../types/screen';
import { DateAndTime } from '../../types/dateAndTime';

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
    MatIconModule
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  form = new FormGroup({
    movie: new FormControl('', [Validators.required]),
    screen: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
  })

  constructor() { }


  isMissing(controlName:string): boolean{
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required'];
  }

  submitHandler(){
    const {movie, screen, date, time} = this.form.value;

    if(!movie){
      return;
    }

    if(!screen){
      return;
    }

    if(!date){
      return;
    }

    if(!time){
      return;
    }

    const [movieId, movieTitle] = movie.split('@@');

    const movieObj: ShortMovie = {
      id: movieId,
      title: movieTitle
    }

    const [screenName, rowsStr, seatsPerRowStr] = screen.split('@@');
    const rows = Number(rowsStr);
    const seatsPerRow = Number(seatsPerRowStr);

    const screenObj: ShortScreen = {
      name: screenName,
      rows:rows,
      seatsPerRow: seatsPerRow
    }

    let dateIsoString = new Date(date).toISOString();
    dateIsoString.replace('00:00:00', time);

    const dateAndTime: DateAndTime = {
      __type:'Date',
      iso: dateIsoString
    }

    console.log('DATA:', {movie: movieObj, screen: screenObj, dateAndTime});
    
  }
}
