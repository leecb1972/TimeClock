import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { WorkShiftComponent } from './work-shift/work-shift.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkShiftComponent,
    RegisterComponent,
    UserComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
