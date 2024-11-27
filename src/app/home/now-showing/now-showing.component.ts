import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-now-showing',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './now-showing.component.html',
  styleUrl: './now-showing.component.css'
})
export class NowShowingComponent implements OnInit {
  nowShowingMovies: Movie[] = [];
  isLoading = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getMovies(4).subscribe(resp => {
      const movies: Movie[] = resp.results as Movie[];
      this.nowShowingMovies = JSON.parse(JSON.stringify(movies));
      this.isLoading = false;
    })
  }
}
