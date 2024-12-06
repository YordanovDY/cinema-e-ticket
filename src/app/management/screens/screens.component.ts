import { Component, OnInit } from '@angular/core';
import { ScreensService } from './screens.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { AsyncPipe } from '@angular/common';
import { TIMES_SCHEDULE } from '../../constants';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-screens',
  standalone: true,
  imports: [LoaderComponent, AsyncPipe, RouterLink],
  templateUrl: './screens.component.html',
  styleUrl: './screens.component.css',
  providers:[ScreensService]
})
export class ScreensComponent implements OnInit {
  TIMES_SCHEDULE = TIMES_SCHEDULE;

  get screens$(){
    return this.screensService.screens$;
  }

  get isLoading(){
    return this.screensService.isLoading$;
  }

  constructor(
    private screensService: ScreensService,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.screensService.getScreens();
  }

  onDelete(buttonRef: HTMLAnchorElement){
    const confirmation = confirm('Are you sure?');

    if(!confirmation){
      return;
    }

    const screenId = buttonRef.id;

    this.screensService.deleteScreen(screenId).subscribe(() => {
      this.screensService.getScreens();
    })
  }
}
