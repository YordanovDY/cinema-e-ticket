import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReadComponent } from './read/read.component';
import { UnreadComponent } from './unread/unread.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { EllipsisPipe } from '../../pipes/ellipsis.pipe';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterLink,
    ReadComponent, 
    UnreadComponent, 
    LoaderComponent, 
    AsyncPipe,
    DatePipe,
    EllipsisPipe
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  providers: [MessagesService]
})
export class MessagesComponent implements OnInit{

  get messages$(){
    return this.messagesService.messages$;
  }

  get isLoading$(){
    return this.messagesService.isLoading$;
  }

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.messagesService.getMessages();
  }
}
