import { OnInit } from "@angular/core";
import { NavController, AlertController, MenuController, App } from "ionic-angular";
import { AuthServiceProvider } from "../providers/auth/auth.service";
import { LoginPage } from "../pages/login/login";

export abstract class BaseComponent implements OnInit {

    protected navCtrl: NavController;

    constructor(
        public alerCtrl: AlertController,
        public authService: AuthServiceProvider,
        public menuCtrl: MenuController,
        public app: App
    ){}

    ngOnInit(): void {
        this.navCtrl = this.app.getActiveNav();
    }

    onLogout(): void {
        this.alerCtrl.create({
            message: 'Você deseja sair?',
            buttons: [
                {
                    text: 'Sim',
                    handler: () => {
                        this.authService.logout()
                            .then(() => {
                                this.navCtrl.setRoot(LoginPage);
                                this.menuCtrl.enable(false, 'user-menu');
                            });
                    }
                },
                {
                    text: 'Não'
                }
            ]
        }).present();
    }

}