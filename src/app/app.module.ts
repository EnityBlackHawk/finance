import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NewEntryComponent } from './components/new-entry/new-entry.component';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localePTBR from '@angular/common/locales/pt'

registerLocaleData(localePTBR);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    NewEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CurrencyPipe,
    DatePipe,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
