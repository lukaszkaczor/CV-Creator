import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation-arrows',
  templateUrl: './navigation-arrows.component.html',
  styleUrls: ['./navigation-arrows.component.scss']
})
export class NavigationArrowsComponent implements OnInit {
  @Input() arrowLeft: string;
  @Input() arrowRight: string;


  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.arrowLeft)
  }

  navigate(url: string){
    this.router.navigateByUrl(url)
  }
}
