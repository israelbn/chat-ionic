import { NgModule } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info';
import { UserMenuComponent } from './user-menu/user-menu';
@NgModule({
	declarations: [UserInfoComponent,
    UserMenuComponent],
	imports: [],
	exports: [UserInfoComponent,
    UserMenuComponent]
})
export class ComponentsModule {}
