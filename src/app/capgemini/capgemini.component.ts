import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-capgemini',
  imports: [],
  templateUrl: './capgemini.component.html',
  styleUrl: './capgemini.component.scss',
})
export class CapgeminiComponent implements OnInit {
  result: any[] = [];
  details = [
    { adults: 2, ages: [12, 45] },
    { adults: 3, ages: [25, 15, 35] },
  ];
  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    return this.details.map((response) => {
      console.log('Response', response);
      //add A to the first element
      // this.result.push('A' + response.adults);
      //add A to the next element
      this.result.push(response.adults + 'A' + '-' + response.ages.join('-'));
      // this.result = this.result.map((item) => {
      //   return 'A' + item;
      // });
      console.log('Output', this.result.join('_'));

      //response from 100 api simlar to link
      // <a href="abc.com">abc</a>
    });
  }
}
