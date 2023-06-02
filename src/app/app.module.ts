import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpService } from './shared/services/http.service';
import { SharedModule } from './shared/shared.module';
import { AppService } from './shared/services/app.service';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule],
    providers: [HttpService, AppService],
    bootstrap: [AppComponent],
})
export class AppModule {}
