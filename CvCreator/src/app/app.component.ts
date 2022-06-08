import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CvCreator';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // this.http.get('https://localhost:7184/test/public').subscribe((data) => {
    //   this.title = JSON.stringify(data);
    //   console.log(JSON.stringify(data));
    // });
  }
}
