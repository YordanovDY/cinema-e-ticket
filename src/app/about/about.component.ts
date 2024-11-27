import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  text: string = '';
  imgURL: string = '';
  isLoading = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getInfoObject().subscribe(obj => {
      this.text = obj.aboutText;
      this.imgURL = obj.aboutImgURL;
      this.isLoading = false;
    })
  }
}
