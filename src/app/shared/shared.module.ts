import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentsComponent} from './components/comments/comments.component';
import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ShortenPipe} from "./pipes/shorten.pipe";
import {UserNamePipe} from "./pipes/userName.pipe";


@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    UserNamePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    UserNamePipe
  ]
})
export class SharedModule {
}
