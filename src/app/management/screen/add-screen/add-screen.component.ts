import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AddScreenService } from './add-screen.service';
import { Router } from '@angular/router';
import { RangeDirective } from '../../../directives/range.directive';
import { CommonFormValidatorsService } from '../../../utils/validators/common-form-validators.service';
import { SimpleValidator } from '../../../types/functions';

@Component({
  selector: 'app-add-screen',
  standalone: true,
  imports: [FormsModule, RangeDirective],
  templateUrl: './add-screen.component.html',
  styleUrl: './add-screen.component.css',
  providers: [CommonFormValidatorsService, AddScreenService]
})
export class AddScreenComponent implements OnInit{
  isMissing: SimpleValidator | null = null;
  tooShort: SimpleValidator | null = null;
  outOfRange: SimpleValidator | null = null;

  constructor(
    private validator: CommonFormValidatorsService,
    private addScreenService: AddScreenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isMissing = this.validator.isMissing;
    this.tooShort = this.validator.tooShort;
    this.outOfRange = this.validator.outOfRange;
  }

  submitHandler(form: NgForm, btn:HTMLButtonElement){
    btn.setAttribute('disabled', 'disabled');
    btn.classList.add('disabled');
    
    const {name, rows, seats, schedule} = form.value;
    
    this.addScreenService.addScreen(name, rows, seats, schedule).subscribe(() => {
      this.router.navigate(['/screens']);
    })
  }
}
