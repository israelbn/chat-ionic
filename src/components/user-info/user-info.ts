import { Component, Input } from '@angular/core';
import { User } from "../../models/user.model";

/**
 * Generated class for the UserInfoComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoComponent {

  @Input() user: User;
  @Input() isMenu: boolean = false;

  constructor() {
    console.log('Hello UserInfoComponent Component');
    
  }

}
