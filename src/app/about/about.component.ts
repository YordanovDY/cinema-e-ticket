import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../shared/loader/loader.component';
import { InfoService } from '../home/info.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  providers: [InfoService]
})
export class AboutComponent implements OnInit {
  text: string = '';
  imgURL: string = '';
  isLoading = true;
  isAdmin: boolean = false;

  constructor(
    private infoService: InfoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.infoService.getInfoObject().subscribe(obj => {
      this.text = obj.aboutText;
      this.imgURL = obj.aboutImgURL;
      this.isLoading = false;
      this.isAdmin = this.route.snapshot.data['isAdmin'];
    })
  }
}
