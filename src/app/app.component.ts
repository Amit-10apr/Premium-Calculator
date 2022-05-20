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
  isValidForm = false;
  occupationList : any[] = [];
  premium : string = "0";
  age :number = 0
  
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

    this.premiumCalForm.get('dob')!.valueChanges.subscribe(val => {
      this.age = this.utilityService.calculateAge(this.premiumCalForm.get('dob')?.value);
      this.calculatePremium();
    });
  }

  get premiumFormControl() {
    return this.premiumCalForm.controls;
  }
  get OccupationRatingFactor() {
    return this.premiumCalForm.get('occupations');
  }

  changeOccupation(e: any) {
    this.calculatePremium();
  }

  onSubmit() {
    this.submitted = true;
    if (this.premiumCalForm.valid) { 
    this.isValidForm = true;
    this.calculatePremium();    
    } else {
      this.isValidForm = false;
    }
  }

  calculatePremium() {
    this.age = this.utilityService.calculateAge(this.premiumCalForm.get('dob')?.value);
    const occupationRatingFactor  = this.OccupationRatingFactor?.value;
    const sumInsured = this.premiumCalForm.get('suminsured')?.value
    this.premium = ((sumInsured * occupationRatingFactor *Number(this.age))/(12 * 1000)).toFixed(2);
    console.log("premium amount is " + this.premium);
  }
}
