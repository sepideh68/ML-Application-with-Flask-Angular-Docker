import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Height prediction';
  weight = 0;
  predicted_height = ""
  backendHost = 'localhost';
  backend_url = "/api";
  constructor(private http: HttpClient) { };
  ngOnInit() {
    this.http.get('/assets/config.json').subscribe((config: any) => {
      this.backendHost = config.backendHost;
    });
  }
  submit() {
    const predict_url = this.backendHost + this.backend_url + "/predict"
    this.http.post(predict_url, this.weight).subscribe(
      (response: any) => {
        console.log(response);
        this.predicted_height = response.prediction;
      },
      (error: any) => {
        console.log('Error sending data:', error);
      }
    );
  }
}
