import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-our-cinema',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './our-cinema.component.html',
  styleUrl: './our-cinema.component.css'
})
export class OurCinemaComponent implements OnInit {
  text: string = '';
  isLoading = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getInfoObject().subscribe(obj => {
      this.text = obj.cinemaText;
      this.isLoading = false;
    })
  }
}
