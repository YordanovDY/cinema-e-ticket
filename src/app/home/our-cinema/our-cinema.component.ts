import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute } from '@angular/router';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-our-cinema',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './our-cinema.component.html',
  styleUrl: './our-cinema.component.css',
  providers: [InfoService]
})
export class OurCinemaComponent implements OnInit {
  text: string = '';
  isLoading = true;
  isAdmin: boolean = false;
  constructor(
    private infoService: InfoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.infoService.getInfoObject().subscribe(obj => {
      this.text = obj.cinemaText;
      this.isLoading = false;
    })
    this.isAdmin = this.route.snapshot.data['isAdmin'];
  }
}
