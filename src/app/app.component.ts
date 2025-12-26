import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BsDatepickerDirective} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BsDatepickerDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'Tamweely.Client';

}
