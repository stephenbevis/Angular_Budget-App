import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {BillService} from './services/bill.service';
import {IncomeService} from './services/income.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { ManageBillComponent } from './components/manage-bill/manage-bill.component';
import { ManageIncomeComponent } from './components/manage-income/manage-income.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ManageBillComponent,
    ManageIncomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    BillService,
    IncomeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
