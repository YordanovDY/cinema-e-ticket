import { Component, OnInit, signal } from '@angular/core';
import { HttpResponseErrorService } from './http-response-error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-http-response-error',
  standalone: true,
  imports: [],
  templateUrl: './http-response-error.component.html',
  styleUrl: './http-response-error.component.css',
  providers: [HttpResponseErrorService]
})
export class HttpResponseErrorComponent implements OnInit {
  errorMsg = signal('');

  constructor(private httpError: HttpResponseErrorService) { }

  ngOnInit(): void {
    this.httpError.apiError$.subscribe((error) => {
      console.log(error); // null ?
      
      if (error) {
        this.errorMsg.set(error.error.error);
      }
    })
  }
}
