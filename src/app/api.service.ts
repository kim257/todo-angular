import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {

  url = 'https://kim257-todo-api.herokuapp.com/api/todo/';

  constructor(private httpClient: HttpClient) {
  }

  public getTodoList() {
    return this.httpClient.get(this.url);
  }

}
