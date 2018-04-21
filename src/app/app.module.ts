import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {ApiService} from './api.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {LaddaModule} from 'angular2-ladda';
import { FormComponent } from '../component/form/form.component';
import { DeleteComponent } from '../component/delete/delete.component';
import {ButtonsModule, ModalModule} from 'ngx-bootstrap';
import { SortPipe } from '../pipe/sort.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DeleteComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    LaddaModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],

})
export class AppModule {
}
