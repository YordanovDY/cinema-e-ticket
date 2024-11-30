import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoaderComponent } from '../shared/loader/loader.component';
import { BuyTicketService } from './buy-ticket.service';
import { PricesService } from '../prices/prices.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-buy-ticket',
  standalone: true,
  imports: [LoaderComponent, AsyncPipe],
  templateUrl: './buy-ticket.component.html',
  styleUrl: './buy-ticket.component.css',
  providers: [BuyTicketService, PricesService]
})
export class BuyTicketComponent implements OnInit{
  ticketType: string = '';
  ticketPrice: string = '';
  chosenRow: string = '';
  chosenSeat: string = '';
  lastChosen: HTMLElement | null = null;

  // Prices Service

  get prices$(){
    return this.pricesService.prices$
  }

  get isPriceLoading$() {
    return this.pricesService.isLoading$;
  }

  // Projection Service

  get projection$(){
    return this.btService.projection$;
  }

  get isProjLoading$(){
    return this.btService.isLoading$;
  }

  constructor(
    private route: ActivatedRoute,
    private btService: BuyTicketService,
    private pricesService: PricesService
  ) { }

  ngOnInit(): void {
    const projectionId = this.route.snapshot.params['projectionId'];
    
    this.pricesService.getPrices();
    this.btService.getSingleProjection(projectionId);
  }

  // TODO: Ticket price field doesn't load initially its data.

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
