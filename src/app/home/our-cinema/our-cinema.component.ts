import { Component, Input, OnInit } from '@angular/core';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-our-cinema',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './our-cinema.component.html',
  styleUrl: './our-cinema.component.css',
  providers: [InfoService]
})
export class OurCinemaComponent implements OnInit {
  @Input ('isAdmin') isAdmin = true;
  text: string = '';
  isLoading = true;
  constructor(
    private infoService: InfoService,
  ) { }

  ngOnInit(): void {
      this.infoService.getInfoObject().subscribe(obj => {
      this.text = obj.cinemaText;
      this.isLoading = false;
    })
  }
}
