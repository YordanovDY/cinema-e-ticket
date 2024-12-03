import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-our-cinema',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './our-cinema.component.html',
  styleUrl: './our-cinema.component.css',
  providers: [ApiService]
})
export class OurCinemaComponent implements OnInit {
  text: string = '';
  isLoading = true;
  isAdmin: boolean = false;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.api.getInfoObject().subscribe(obj => {
      this.text = obj.cinemaText;
      this.isLoading = false;
    })
    this.isAdmin = this.route.snapshot.data['isAdmin'];
  }
}
