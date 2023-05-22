import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Output() commentAdded = new EventEmitter<string>();
  comment: string = '';
  producto: any;

  addComment() {
    this.commentAdded.emit(this.comment);
    this.comment = '';
  }
}
