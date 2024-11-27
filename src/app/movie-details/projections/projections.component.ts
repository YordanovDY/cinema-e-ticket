import { Component, Input, OnInit } from '@angular/core';
import { PaginatorComponent } from "../../shared/paginator/paginator.component";
import { ApiService } from '../../api.service';
import { Projection } from '../../types/projection';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projections',
  standalone: true,
  imports: [PaginatorComponent, RouterLink],
  templateUrl: './projections.component.html',
  styleUrl: './projections.component.css'
})
export class ProjectionsComponent implements OnInit {
  @Input() movieId: string | undefined;
  projections: Projection[] | null = null;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    if (this.movieId) {
      this.api.getProjections(this.movieId).subscribe(projections => {
        this.projections = projections.results as Projection[];
      });
    }
  }

  parseDate(date: string): string {
    return new Date(date).toLocaleString('uk-Uk');
  }
}
