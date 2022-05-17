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
  occupationList : any[] = [];
  City: string[] = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];

  constructor(
    private fb: FormBuilder,
    private utilityService: UtilityService
  ) { 
    this.occupationList = this.utilityService.getOccupationWithFactor();
    console.log("occupation is " +this.occupationList[1].occupation);
  }

  ngOnInit() {
    this.premiumCalForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', [Validators.required]],
      occupations: ['', Validators.required],
      suminsured: ['', Validators.required]
    }
    );
  }

  get premiumFormControl() {
    return this.premiumCalForm.controls;
  }
  get OccupationName() {
    return this.premiumCalForm.get('occupations');
  }

  changeOccupation(e: any) {
    this.OccupationName?.setValue(e.target.value, {
      onlySelf: true,
    });
    console.log(this.premiumCalForm.get('occupations')?.value)
    var age = this.utilityService.calculateAge(this.premiumCalForm.get('dob')?.value);
  }
  onSubmit() {
    this.submitted = true;
    // if (this.premiumCalForm.valid) {
    //   alert('Form Submitted succesfully!!!\n Check the values in browser console.');
    //   console.table(this.premiumCalForm.value);
    // }

    var age = this.utilityService.calculateAge(this.premiumCalForm.get('dob')?.value)
   // var occupation = this.utilityService.getOccupationWithFactor();
    console.log("occupation is " +this.occupationList[1].factor);
    console.log("age is " + age);
    console.log(this.premiumCalForm.get('name')?.value)
    console.log(this.premiumCalForm.get('dob')?.value)
  }
}
