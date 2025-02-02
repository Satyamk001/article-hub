import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ThemeService } from 'src/app/services/theme.service';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {


  constructor(private dialog : MatDialog,
  private router : Router,
  public themeService : ThemeService){}

  logout(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.data = {
      message : 'logout'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogconfig);
    const resposne = dialogRef.componentInstance.onEmitStatusChange.subscribe((response: any)=>{
      dialogRef.close();
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    })
  }
  changeTheme(color:any){
    this.themeService.setTheme(color);
  }

}
