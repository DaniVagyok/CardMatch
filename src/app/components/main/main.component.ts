import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  pairnum: number;

  constructor(private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
  }
  
  submit(num){
    this.router.navigate(['/game', {pairnum: num}]);
  }
}
