import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileListPageComponent } from './profile-list-page/profile-list-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: 'list', component: ProfileListPageComponent }];

@NgModule({
    declarations: [ProfileListPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ProfileModule {}
