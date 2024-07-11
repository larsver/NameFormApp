import { Component } from '@angular/core';
import { PersonFormComponent } from './person-form/person-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonFormComponent],
  template: `<app-person-form></app-person-form>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PersonFormApp';
}