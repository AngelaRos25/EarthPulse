import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from "../content/content.component";
import {MatIconModule} from '@angular/material/icon';
import { FooterComponent } from "../footer/footer.component";


@Component({
  selector: 'app-homepage',
  imports: [ContentComponent, CommonModule, MatIconModule, FooterComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
