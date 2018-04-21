import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Todo} from '../../app/todo';
import {ApiService} from '../../app/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild('formModal') formModal: ElementRef;
  @Output() created = new EventEmitter<void>();
  modalRef: BsModalRef;
  isLoading = false;
  isCreate: boolean;
  todo: Todo;

  constructor(public modalService: BsModalService,
              private apiService: ApiService) {
  }

  ngOnInit() {
  }

  callModal(todo: Todo = {
    name: ''
  }) {
    this.isCreate = (typeof (todo.id) !== 'number');
    this.todo = _.cloneDeep(todo);
    this.modalRef = this.modalService.show(this.formModal);
  }

  submit() {
    this.isLoading = true;
    this.checkIsCreate(this.todo).subscribe((res) => {
      this.modalRef.hide();
      this.created.emit();
      this.isLoading = false;
    }, err => {
      console.info('error', err);
      this.modalRef.hide();
      this.created.emit();
      this.isLoading = false;
    });
  }

  checkIsCreate(todo) {
    return (this.isCreate ? this.apiService.createTodo(todo) : this.apiService.updateTodo(todo));
  }

}
