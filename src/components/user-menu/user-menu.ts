import { Component, Input } from '@angular/core';
import { User } from "../../models/user.model";
import { AlertController, MenuController, App } from "ionic-angular";
import { AuthServiceProvider } from "../../providers/auth/auth.service";
import { BaseComponent } from "../base.component";
import { UserProfilePage } from "../../pages/user-profile/user-profile";

/**
 * Generated class for the UserMenuComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.html'
})
export class UserMenuComponent extends BaseComponent{

  @Input('user') usuarioLogado: User;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider,
    public menuCtrl: MenuController,
    public app: App
  ) {
    super(alertCtrl, authService, menuCtrl, app);
  }

  onProfile(): void {
    this.navCtrl.push(UserProfilePage);
  }

}
