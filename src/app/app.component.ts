import {Component} from '@angular/core';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private apiService: ApiService) {
    this.getTodoList();
  }

  getTodoList() {
    this.apiService.getTodoList().subscribe((res) => {
      console.info('res', res);
    }, (err) => {
      console.info('err', err);
    });
  }

}
