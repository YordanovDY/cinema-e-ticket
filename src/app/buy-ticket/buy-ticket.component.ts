import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { Projection } from '../types/projection';
import { Price } from '../types/price';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-buy-ticket',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './buy-ticket.component.html',
  styleUrl: './buy-ticket.component.css'
})
export class BuyTicketComponent implements OnInit {
  projection: Projection | null = null;
  isProjLoading = true;
  isPriceLoading = true;
  rows = [];
  seatsPerRow = [];
  prices: Price[] = [];
  ticketType: string = '';
  ticketPrice: string = '';
  chosenRow: string = '';
  chosenSeat: string = '';
  lastChosen: HTMLElement | null = null;

  constructor(private api:ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const projectionId = this.route.snapshot.params['projectionId'];
    
    this.api.getSingleProjection(projectionId).subscribe(projection => {
      this.projection = projection;
      this.rows.length = projection.screen.rows;
      this.seatsPerRow.length = projection.screen.seatsPerRow;
      this.isProjLoading = false;
    })

    this.api.getPrices().subscribe(resp => {
      this.prices = resp.results as Price[];
      this.ticketType = this.prices[0].ticketType;
      this.ticketPrice = this.prices[0].ticketPrice.toFixed(2);
      this.isPriceLoading = false;
    })
  }


  typeTicketChange(ticketTypeRef: HTMLSelectElement) {
    this.ticketPrice = Number(ticketTypeRef.value).toFixed(2);
  }

  chooseASeat(event: Event) {
    if(this.lastChosen) {
      this.lastChosen.classList.remove('chosen');
    }

    const currentTarget = event.currentTarget as HTMLElement;
    this.lastChosen = currentTarget;

    const id = currentTarget.getAttribute('id');
    const [row, seat] = id?.split('x') as string[];

    this.chosenRow = row;
    this.chosenSeat = seat;
    currentTarget.classList.add('chosen');
  }
}
