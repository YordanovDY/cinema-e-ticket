import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { EditScreenService } from './edit-screen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { rangeValidator } from '../../../utils/validators/range.validator';

@Component({
  selector: 'app-edit-screen',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-screen.component.html',
  styleUrl: './edit-screen.component.css',
  providers: [EditScreenService]
})
export class EditScreenComponent implements OnInit {

  screenId: string = '';

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    rows: new FormControl('', [Validators.required, rangeValidator([3, 35])]),
    seats: new FormControl('', [Validators.required, rangeValidator([5, 20])]),
    schedule: new FormControl('', [Validators.required]),
  })

  constructor(
    private editScreenService: EditScreenService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const screenId = this.route.snapshot.params['screenId'];
    this.screenId = screenId;

    this.editScreenService.getSingleScreen(screenId).subscribe((screen)=>{
      this.form.patchValue({
        name: screen.name,
        rows: screen.rows.toString(),
        seats: screen.seatsPerRow.toString()
      })
    });
  }

  isMissing(controlName: string): boolean{
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['required'];
  }
  tooShort(controlName: string): boolean{
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['minlength'];
  }
  outOfRange(controlName: string): boolean{
    return this.form.get(controlName)?.touched && this.form.get(controlName)?.errors?.['rangeValidator'];
  }

  submitHandler(){
    const {name, rows, seats, schedule} = this.form.value;

    this.editScreenService.editScreen(
      this.screenId,
      name as string,
      rows as string, 
      seats as string, 
      schedule as string
    ).subscribe(() =>{
      this.router.navigate(['/screens']);
    })
    
  }
}
