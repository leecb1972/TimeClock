import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/User";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
  }

  showDateTime(dateTime: string): string {
    return dateTime ? dateTime.substring(0, 19).replace('T', ' ') : 'N/A';
  }
}
