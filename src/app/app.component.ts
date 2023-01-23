import { Component } from '@angular/core';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgShower = '';

  res = ''

  constructor(private fileService: FilesService) {}

  toggleButtom() {
    console.log('click');
  }

  onLoad(event: string): void {
    console.log(event);
  }

  downloadFile() {
    return this.fileService
      .getFile(
        'my_file.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'pdf'
      )
      .subscribe();
  }

  onUpload(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file){
      this.fileService.uploadfile(file).subscribe(
        (res) => {
          this.res = JSON.stringify(res);
        }
      )

    }
  }
}
