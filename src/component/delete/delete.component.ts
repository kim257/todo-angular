import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Todo} from '../../app/todo';
import {ApiService} from '../../app/api.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal: ElementRef;
  @Output() deleted = new EventEmitter<void>();
  modalRef: BsModalRef;
  isLoading = false;

  todo: Todo;

  constructor(public modalService: BsModalService,
              private apiService: ApiService) {
  }

  ngOnInit() {
  }

  callModal(todo: Todo) {
    this.todo = todo;
    this.modalRef = this.modalService.show(this.deleteModal);
  }

  submit() {
    this.isLoading = true;
    this.apiService.deleteTodo(this.todo).subscribe((res) => {
      this.modalRef.hide();
      this.deleted.emit();
      this.isLoading = false;
    }, err => {
      this.modalRef.hide();
      this.deleted.emit();
      this.isLoading = false;
    });
  }


}
