import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  pairnum: number;
  invalidPairnum: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.invalidPairnum=false;
  }

  submit(num) {
    if (num >= 3 && num <= 10) {
      this.invalidPairnum = true;
      this.router.navigate(['/game', { pairnum: num }]);
    }
    else {
      this.invalidPairnum = false;
    }
  }
}
