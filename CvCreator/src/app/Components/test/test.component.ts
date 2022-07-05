import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  admin: any = '';
  public = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http
    //   .get('https://localhost:7184/test/Admins', { responseType: 'text' })
    //   .subscribe((data) => {
    //     this.admin = data;
    //   });

    this.http.get('https://localhost:7184/cv').subscribe((data) => {
      this.public = JSON.stringify(data);
    });
    // this.http.get('https://localhost:7184/test/public').subscribe((data) => {
    //   this.public = JSON.stringify(data);
    // });
  }
}
