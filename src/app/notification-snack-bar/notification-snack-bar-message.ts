import { Injectable } from "@angular/core";
import { NotificationSnackBarComponent } from 'src/app/notification-snack-bar/notification-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationSnackBarMessage { 

    constructor(public _matSnackBar: MatSnackBar) {}
    
   public showSuccess(msg: string) {
    this._matSnackBar.openFromComponent(NotificationSnackBarComponent, {
      data: {
        success: true,
        notificationText: msg,
      },
      duration: 3000,
      panelClass: ['snack-success']
    });
  }

   public showError(msg: string) {
    this._matSnackBar.openFromComponent(NotificationSnackBarComponent, {
      data: {
        success: false,
        notificationText: msg,
      },
      duration: 3000,
      panelClass: ['snack-error']
    });
  }

} 