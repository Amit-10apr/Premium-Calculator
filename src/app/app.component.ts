import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'premium-calculator';

  premiumCalForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.premiumCalForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', [Validators.required]],
      occupation: ['', Validators.required],
      suminsured: ['', Validators.required],
    }
    );
  }

  get premiumFormControl() {
    return this.premiumCalForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.premiumCalForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.premiumCalForm.value);
    }

    var age = this.utilityService.calculateAge(this.premiumCalForm.get('dob')?.value)
    console.log("age is " + age);
    console.log(this.premiumCalForm.get('name')?.value)
    console.log(this.premiumCalForm.get('dob')?.value)
  }
}
