import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  imgShower = '';


  toggleButtom() {
    console.log('click');
  }


  onLoad(event: string){
    console.log(event);
  }
}
