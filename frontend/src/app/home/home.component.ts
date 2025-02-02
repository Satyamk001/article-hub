import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menu : any;
  constructor(public themeService : ThemeService){}

  changeTheme(color:any){
    this.themeService.setTheme(color);
  }
}
