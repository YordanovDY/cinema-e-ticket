import { Component, OnInit } from '@angular/core';
import { TicketsService } from './tickets.service';
import { UserService } from '../user.service';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [LoaderComponent, AsyncPipe],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
  providers: [TicketsService, UserService]
})
export class TicketsComponent implements OnInit {
  userId: string = '';

  get tickets$() {
    return this.ticketsService.tickets$;
  }

  get isLoading$() {
    return this.ticketsService.isLoading$;
  }

  constructor(
    private ticketsService: TicketsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(user => {
      this.userId = user.objectId;
      this.ticketsService.getTicketsFromUser(this.userId);
    })

  }

}

