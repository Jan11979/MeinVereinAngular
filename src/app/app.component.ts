import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularmeinverein';

  idUserEvent: number = -1;

  setEventId(id: number) {
    this.idUserEvent = id;
  }
}
