import { Component, OnInit, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'grape-notification-snack-bar',
  templateUrl: './notification-snack-bar.component.html',
  styleUrls: ['./notification-snack-bar.component.scss']
})
export class NotificationSnackBarComponent implements OnInit {
  msg: string;
  success: boolean;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
    this.msg = this.data.notificationText;
    this.success = this.data.success;
  }

}
