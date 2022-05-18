import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  //this data may come from API but for now i have hardcoded
  occupation_rating = [

    { Occupation : 'Cleaner', Rating: 'Light Manual'},
    { Occupation : 'Doctor', Rating: 'Professional'},
    { Occupation : 'Author', Rating: 'White Collar'},
    { Occupation : 'Farmer', Rating: 'Heavy Manual'},
    { Occupation : 'Mechanic', Rating: 'Heavy Manual'},
    { Occupation : 'Florist', Rating: 'Light Manual'}

  ]

  //this data may come from API but for now i have hardcoded
  rating_factor = [

    { Rating : 'Professional', Factor: 1.0 },
    { Rating : 'White Collar', Factor: 1.25 },
    { Rating : 'Light Manual', Factor: 1.50 },
    { Rating : 'Heavy Manual', Factor: 1.75 }
    
  ]

  constructor() { }

   calculateAge(birthday:Date) { 
    var ageDifMs = Date.now() - new Date(birthday).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getOccupationWithFactor() {

    var results = [];
    for (var i=0; i<this.occupation_rating.length; i++) {
        for (var j=0; j<this.rating_factor.length; j++) {
            if (this.occupation_rating[i].Rating === this.rating_factor[j].Rating) {
                results.push({
                    occupation: this.occupation_rating[i].Occupation, 
                    rating: this.occupation_rating[i].Rating,
                    factor: this.rating_factor[j].Factor
                });
            }
        }
    }
    console.log(results)
    return results;
  
  }
}
