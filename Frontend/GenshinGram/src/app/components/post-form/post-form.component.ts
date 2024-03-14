
import { Component, Input } from '@angular/core';
import { PostServiceService } from 'src/app/services/post-service.service';
import { Post } from 'src/app/models/post';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NewDialogComponent } from '../new-dialog/new-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  @Input() btnText!: string
  form!: FormGroup;

  selectedFile: File | null = null;

  constructor(private formbuilder: FormBuilder, private service: PostServiceService, public dialog: MatDialog,) {

    this.form = formbuilder.group({
      title: [null],
      description: [null],
      image: [null],

    })
  }

  onFileSelected(event: any): void {
    const selectedFile = event.target.files[0] as File;
    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB

    if (selectedFile && allowedTypes.includes(selectedFile.type) && selectedFile.size <= maxSizeInBytes) {
      this.selectedFile = selectedFile;
    } else {
      this.selectedFile = null;
      console.log('Por favor, selecione um arquivo JPEG ou PNG menor que 10MB.');
    }

  }

  //validação do campo titulo
  title = new FormControl('', [Validators.required]);

  getTitleErrorMessage() {
    this.title.hasError('required')
    return 'Dê um titulo ao seu post'
  }

  //validação do campo descrição

  description = new FormControl('', [Validators.required]);

  getdescriptionErrorMessage() {
    this.description.hasError('required')
    return 'Digite uma descrição';
  }

  openDialog(){
    this.dialog.open(NewDialogComponent)
  };

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.service.save(this.form.value).subscribe(result => console.log(result));
    this.openDialog();
  }

}
