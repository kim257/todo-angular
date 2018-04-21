import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from './todo';

@Injectable()
export class ApiService {

  url = 'https://kim257-todo-api.herokuapp.com/api/todo/';

  constructor(private httpClient: HttpClient) {
  }

  public getTodoList() {
    return this.httpClient.get(this.url);
  }

  public createTodo(todo: Todo) {
    return this.httpClient.post(this.url, todo);
  }

  public getTodo(todo) {
    return this.httpClient.get(this.url + todo.id, todo);
  }

  public updateTodo(todo) {
    return this.httpClient.put(this.url + todo.id, todo);
  }

  public deleteTodo(todo) {
    return this.httpClient.delete(this.url + todo.id);
  }

  public getURL() {
    return this.url;
  }

}
