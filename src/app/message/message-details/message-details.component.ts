import { Component, OnInit } from '@angular/core';
import { MessageDetailsService } from './message-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-message-details',
  standalone: true,
  imports: [LoaderComponent, AsyncPipe, DatePipe],
  templateUrl: './message-details.component.html',
  styleUrl: './message-details.component.css',
  providers:[MessageDetailsService]
})
export class MessageDetailsComponent implements OnInit{
  get message$(){
    return this.messageDetailsService.message$;
  }

  get isLoading$(){
    return this.messageDetailsService.isLoading$;
  }

  constructor(
    private messageDetailsService: MessageDetailsService,
    private route: ActivatedRoute,
    private router: Router
  ){ }

  ngOnInit(): void {
    const messageId = this.route.snapshot.params['messageId'];

    this.messageDetailsService.getSingleMessage(messageId);
    this.messageDetailsService.changeToRead(messageId);
  }

  onDelete(btnRef: HTMLAnchorElement){
    const confirmation = confirm('Are you sure?');

    if(!confirmation){
      return;
    }

    const messageId = btnRef.id;
    this.messageDetailsService.deleteMessage(messageId).subscribe(() => {
      this.router.navigate(['/messages']);
    })
  }
}
