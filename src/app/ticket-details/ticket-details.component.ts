import { Component } from '@angular/core';
import { QrCodeModule } from 'ng-qrcode';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [QrCodeModule],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent {

}
