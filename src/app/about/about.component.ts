import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../shared/loader/loader.component';
import { InfoService } from '../home/info.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  providers: [InfoService]
})
export class AboutComponent implements OnInit {
  text: string = '';
  imgURL: string = '';
  isLoading = true;

  constructor(private infoService: InfoService) { }

  ngOnInit(): void {
      this.infoService.getInfoObject().subscribe(obj => {
      this.text = obj.aboutText;
      this.imgURL = obj.aboutImgURL;
      this.isLoading = false;
    })
  }
}
