import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Price } from '../types/price';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css'
})
export class PricesComponent implements OnInit{
  prices: Price[] = [];
  isLoading = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getPrices().subscribe(resp => {
      this.prices = resp.results as Price[];
      this.isLoading = false;
    });
  }
}
