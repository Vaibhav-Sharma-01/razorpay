import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
})
export class SlotsComponent implements OnInit {
  count = 0;
  dates: any;
  Strattime = 8;
  endtime = 22;
  color = ['Red', 'Green', 'Yellow'];
  available = ['00', '15', '30', '45'];
  times: Array<string> = [];
  divisor: any;
  constructor() {}
  ngOnInit(): void {}

  getvalue(e: any) {
    console.log(e.value);
    if (this.count == 0) {
      this.count = 1;
    } else {
      this.count = 0;
    }
  }

  submit(event: any) {
    this.dates = event.toDateString();
    for (let i = this.Strattime; i < this.endtime; i++) {
      for (let j = 0; j < 4; j++) {
        let time = i + ':' + this.available[j];
        if (i < 10) {
          time = '0' + time;
        }
        this.times.push(time);
      }
    }
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    this.divisor = Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
