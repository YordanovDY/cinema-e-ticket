import { Component, OnInit } from '@angular/core';
import { TicketsService } from './tickets.service';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Ticket } from '../../types/ticket';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [LoaderComponent, AsyncPipe, RouterLink],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
  providers: [TicketsService, UserService]
})
export class TicketsComponent implements OnInit {
  userId: string = '';
  tickets = [] as Ticket[];
  get tickets$() {
    return this.ticketsService.tickets$;
  }

  get isLoading$() {
    return this.ticketsService.isLoading$;
  }

  constructor(
    private ticketsService: TicketsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.userId = this.userService.getUserInfo().userId;
      this.ticketsService.getTicketsFromUser(this.userId);
      this.tickets$.subscribe(tickets => {
        this.tickets = tickets as Ticket[];
      })
  }

}

