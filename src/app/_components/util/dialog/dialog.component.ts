import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { SnackModel } from 'src/app/_models/SnackModel';
import { SnackBarComponent } from '../snack-bar-component/snack-bar.component';
import { MateriasService } from 'src/app/_services/utils/materias.service';
import { Usuarios } from 'src/app/_models/Usuarios';
import { MateriasData } from '../interfaces/util-interfaces';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  closeModal() {
    this.dialogRef.close();
  }
}
