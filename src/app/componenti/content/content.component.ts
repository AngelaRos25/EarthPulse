import { Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-content',
  imports: [MatCardModule, CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent  implements OnInit{

  itemsPerPage = 3;
  currentPage = 0;
  lastPage = 0;
  
  cards = [
    {title:'Global Temperature', image:'assets/image/drought.jpg', link:'/temperature'},
    {title:'CO2 Levels', image:'assets/image/ciminiere.jpg', link:'/co2'},
    {title:'Methane Concentration', image:'assets/image/cow.jpg', link:'/methane'},
    {title:'NO2 Measurements', image:'assets/image/city.jpg', link:'/no2'},
    {title:'Polar Ice Extent', image:'assets/image/ice.jpg', link:'/ice'}
  ]

  constructor(){}

  ngOnInit(): void {
  }

}
