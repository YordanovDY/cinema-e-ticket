import { Component, Input, OnInit } from '@angular/core';
import { PaginatorComponent } from "../../shared/paginator/paginator.component";
// import { ApiService } from '../../api.service';
import { Projection } from '../../types/projection';
import { RouterLink } from '@angular/router';
import { ProjectionsService } from './projections.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { LoaderComponent } from "../../shared/loader/loader.component";

@Component({
  selector: 'app-projections',
  standalone: true,
  imports: [
    PaginatorComponent,
    RouterLink,
    AsyncPipe,
    DatePipe,
    LoaderComponent
],
  templateUrl: './projections.component.html',
  styleUrl: './projections.component.css',
  providers: [ProjectionsService]
})
export class ProjectionsComponent implements OnInit {
  @Input() movieId: string | undefined;

  get projections$() {
    return this.projectionsService.projections$;
  }

  get isLoading$(){
    return this.projectionsService.isLoading$;
  }

  constructor(private projectionsService: ProjectionsService) { }

  ngOnInit(): void {
    if (!this.movieId) {
      return;
    }

    this.projectionsService.getProjections(this.movieId);
  }
}
