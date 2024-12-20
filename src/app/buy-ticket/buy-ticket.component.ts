import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoaderComponent } from '../shared/loader/loader.component';
import { BuyTicketService } from './buy-ticket.service';
import { PricesService } from '../prices/prices.service';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { TicketsService } from '../user/tickets/tickets.service';
import { Ticket } from '../types/ticket';
import { tap } from 'rxjs';

@Component({
  selector: 'app-buy-ticket',
  standalone: true,
  imports: [
    LoaderComponent, 
    AsyncPipe, 
    ReactiveFormsModule
  ],
  templateUrl: './buy-ticket.component.html',
  styleUrl: './buy-ticket.component.css',
  providers: [
    BuyTicketService, 
    PricesService, 
    UserService,
    TicketsService
  ]
})
export class BuyTicketComponent implements OnInit {
  lastChosen: HTMLElement | null = null;
  soldTickets: string[] = [];

  form = new FormGroup({
    projectionId: new FormControl(''),
    userId: new FormControl(''),
    movie: new FormControl(''),
    screen: new FormControl(''),
    dateAndTime: new FormControl(''),
    row: new FormControl('', [Validators.required]),
    seat: new FormControl('', [Validators.required]),
    ticketType: new FormControl('', [Validators.required]),
    ticketPrice: new FormControl('')
  })

  // Prices Service

  get prices$() {
    return this.pricesService.prices$
  }

  get isPriceLoading$() {
    return this.pricesService.isLoading$;
  }

  // Projection Service

  get projection$() {
    return this.btService.projection$;
  }

  get isProjLoading$() {
    return this.btService.isLoading$;
  }

  // Ticket Service

  get tickets$(){
    return this.ticketsService.tickets$;
  }

  get isTicketsLoading$(){
    return this.ticketsService.isLoading$;
  }

  isTypeMissing(): boolean{
    return this.form.get('ticketType')?.touched  && this.form.get('ticketType')?.errors?.['required'];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private btService: BuyTicketService,
    private pricesService: PricesService,
    private userService: UserService,
    private ticketsService: TicketsService
  ) { }

  ngOnInit(): void {
    const projectionId: string = this.route.snapshot.params['projectionId'];

    this.pricesService.getPrices();
    this.btService.getSingleProjection(projectionId);

    this.projection$.subscribe(proj => {
      this.form.patchValue({
        userId: this.userService.getUserInfo().userId,
        projectionId: projectionId,
        movie: proj?.movie.title,
        screen: proj?.screen.name,
        dateAndTime: proj?.dateAndTime.iso,
      })})

    this.ticketsService.getTicketsFromProjection(projectionId);
    this.tickets$.pipe(tap(
      tickets => tickets?.forEach(t =>{
        const soldSeat = `${t.row}x${t.seat}`;
        this.soldTickets.push(soldSeat)
      })
    )).subscribe(()=>{ })

    
  }

  typeTicketChange(ticketTypeRef: HTMLSelectElement) {
    const ticketPrice = Number(ticketTypeRef.value).toFixed(2);
    this.form.patchValue({
      ticketPrice: ticketPrice
    })
  }

  chooseASeat(event: Event) {
    if (this.lastChosen) {
      this.lastChosen.classList.remove('chosen');
    }

    const currentTarget = event.currentTarget as HTMLElement;
    this.lastChosen = currentTarget;

    const id = currentTarget.getAttribute('id');
    const [row, seat] = id?.split('x') as string[];

    this.form.patchValue({
      row: row,
      seat: seat
    })

    currentTarget.classList.add('chosen');
  }

  submitHandler(btn: HTMLButtonElement) {
    btn.setAttribute('disabled', 'disabled');
    btn.classList.add('disabled');

    this.prices$.subscribe(data => {
      const TicketInfo = data?.find(ticket => ticket.ticketPrice === Number(this.form.value.ticketType));
      const newType = TicketInfo?.ticketType;

      if (newType) {
        this.form.value.ticketType = newType;

      } else {
        return;
      }
    })

    const {dateAndTime, movie, projectionId, row, seat, screen, ticketPrice, ticketType, userId} = this.form.value;
    
    this.btService.buyTicket(
      projectionId as string, 
      userId as string,
      movie as string,
      screen as string,
      row as string,
      seat as string,
      dateAndTime as string,
      ticketType as string, 
      ticketPrice as string
      
    ).subscribe(() =>{
      this.router.navigate(['/tickets']);
    });

  }
}
