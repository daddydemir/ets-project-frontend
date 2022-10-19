import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-photo',
  templateUrl: './update-photo.component.html',
  styleUrls: ['./update-photo.component.css']
})
export class UpdatePhotoComponent implements OnInit {

  form!: FormGroup;
  selectedFile!: File;
  progress: number = 0;
  filePath: string = '';

  constructor(
    private fb: FormBuilder,
    private service: AuthService
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      file: ['', Validators.required]
    });
  }


  update = async () => {
    if (this.form.valid){

      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      await this.service.imageUpdate(3,formData).then(
        item => {
          if(item?.success){
            alert(item.message);
          }else{
            alert(item?.message);
          }
        }
      );
    }
    
  }

  onFileSelected (event: any) {
    for(let i = 0; i < event.target.files.length; i++){
      this.selectedFile = <File>event.target.files[i];
      const files = (event.target as HTMLInputElement).files || [];
      const file = files[i];
      this.form.patchValue({
        file:file
      });
      this.form.get('file')?.updateValueAndValidity();
    }
    if(event.target.files && event.target.files[0]){
      var reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        if(/^image\//.test(this.selectedFile.type)){
          const result = (<FileReader>event.target).result || "";
          this.filePath = result.toString();
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
