import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'dashboard', component: DashboardPageComponent }];

@NgModule({
    declarations: [DashboardPageComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
