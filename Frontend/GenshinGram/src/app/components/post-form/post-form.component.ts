
import { Component, Input } from '@angular/core';
import { PostServiceService } from 'src/app/services/post-service.service';
import { Post } from 'src/app/models/post';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  @Input() btnText!: string

  selectedFile: any = null;

onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

}

onSubmit(){
  console.log("deu bão")
}

}
