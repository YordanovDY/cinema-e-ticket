import { Component, OnInit } from '@angular/core';
// !import { ApiService } from '../api.service';
// !import { Price } from '../types/price';
import { LoaderComponent } from '../shared/loader/loader.component';
import { PricesService } from './prices.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [LoaderComponent, AsyncPipe],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css',
  providers: [PricesService]
})
export class PricesComponent implements OnInit{
  get prices$() {
    return this.pricesService.prices$;
  }

  get isLoading$(){
    return this.pricesService.isLoading$;
  }

  constructor(private pricesService: PricesService) { }

  ngOnInit(): void {
    //! this.api.getPrices().subscribe(resp => {
    //   this.prices = resp.results as Price[];
    //   this.isLoading = false;
    // });

    this.pricesService.getPrices();
  }
}
