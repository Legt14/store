import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';

interface FileUpload {
  originalname:string,
  filename:string,
  location:string
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  urlApi = 'https://young-sands-07814.herokuapp.com/api/files/upload';
  constructor(private http: HttpClient) {}

  getFile(name: string, url: string, type: string) {
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(tap((content) => {
        const blob = new Blob([content], {type});
        saveAs(blob, name);
      }),
      map(()=> true)
      );
  }

  uploadfile(file: Blob){
    const dto = new FormData;
    dto.append('file', file)
    return this.http.post(this.urlApi, dto)
  }
}
