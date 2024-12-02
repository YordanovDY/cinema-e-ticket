import { Component, OnInit } from '@angular/core';
import { QrCodeModule } from 'ng-qrcode';
import { TicketDetailsService } from './ticket-details.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [
    QrCodeModule, 
    LoaderComponent,
    AsyncPipe,
    DatePipe
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css',
  providers:[TicketDetailsService]
})
export class TicketDetailsComponent implements OnInit{
  get ticket$(){
    return this.tdService.ticket$;
  }

  get isLoading$(){
    return this.tdService.isLoading$;
  }

  constructor(
    private tdService: TicketDetailsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const ticketId = this.route.snapshot.params['ticketId'];
    this.tdService.getSingleTicket(ticketId);
  }
}
