import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-new-dialog',
  templateUrl: './new-dialog.component.html',
  styleUrls: ['./new-dialog.component.scss']
})
export class NewDialogComponent {
  constructor(public dialogRef: MatDialogRef<NewDialogComponent>){

  }
  onClick(){
    window.location.reload();
  }
}
