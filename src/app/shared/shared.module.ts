import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpService } from './services/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SearchFilterPipe } from './utils/custom-pipes';
import { AppService } from './services/app.service';
import { AppInterceptor } from './services/app.interceptor';

@NgModule({
    declarations: [LoaderComponent, SearchFilterPipe],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, HttpClientModule],
    exports: [LoaderComponent, FormsModule, ReactiveFormsModule, MaterialModule, HttpClientModule, SearchFilterPipe],
    providers: [
        HttpService,
        AppService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true,
        },
    ],
})
export class SharedModule {}
