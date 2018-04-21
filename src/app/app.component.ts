import {Component, ViewChild} from '@angular/core';
import {ApiService} from './api.service';
import {Todo} from './todo';
import {FormComponent} from '../component/form/form.component';
import {DeleteComponent} from '../component/delete/delete.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('form') form: FormComponent;
  @ViewChild('delete') delete: DeleteComponent;

  todoList: Array<Todo>;
  updateIsLoading: Array<boolean>;
  isLoading = false;


  constructor(public apiService: ApiService) {
    this.getTodoList();
  }

  getTodoList() {
    this.isLoading = true;
    this.apiService.getTodoList().subscribe((res) => {
      this.todoList = res as Array<Todo>;
      this.updateIsLoading = _.fill(Array(_.size(this.todoList)), false);
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      console.info('err', err);
    });
  }

  updateIscomplete(todo) {
    const todoNew = _.cloneDeep(todo);
    todoNew.isComplete = !todoNew.isComplete;
    const indexUpdate = _.indexOf(this.todoList, todo);
    this.updateIsLoading[indexUpdate] = true;
    this.apiService.updateTodo(todoNew).subscribe(() => {
      this.apiService.getTodo(todo).subscribe((resFromgetTodo) => {
        this.todoList[indexUpdate] = resFromgetTodo as Todo;
        this.updateIsLoading[indexUpdate] = false;
      });

    }, err => {
      this.isLoading = false;
    });
  }

  updateTodo(todo: Todo) {
    this.form.callModal(todo);
  }

  createTodo() {
    this.form.callModal();
  }

  deleteTodo(todo) {
    this.delete.callModal(todo);
  }

}
