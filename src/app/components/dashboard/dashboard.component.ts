import { Component, OnInit } from '@angular/core';

// Models
import {Bill} from '../../models/Bill';
import {Income} from '../../models/Income';

// Services
import {BillService} from '../../services/bill.service';
import {IncomeService} from '../../services/income.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  // Properties
  bills: Bill[];
  currentBill: Bill = {
    id: 0,
    name: "",
    amount: 0,
    due: ""
  };
  updatingBill = false;
  amountSum = 0;
  youHaveBills = false;

  incomes: Income[];
  currentIncome: Income = {
    id: 0,
    source: "",
    amount: 0,
    receive: ""
  };
  updatingIncome = false;
  incomeAmountSum = 0;
  youHaveIncome = false;

  constructor(private billService: BillService, private incomeService: IncomeService) { }

  ngOnInit() {
    this.billService.getBills().subscribe(bills => {
      this.bills = bills;

      if(this.bills.length > 0){
        this.youHaveBills = true;
      }

      this.amountSum = 0;
      this.getTotal();
    });



    this.incomeService.getIncome().subscribe(incomes => {
      this.incomes = incomes;

      if(this.bills.length > 0){
        this.youHaveIncome = true;
      }

      this.incomeAmountSum = 0;
      this.getIncomeTotal();
    });
  }




  // Bill Management Functions

  openNewBillMenu(){
    this.updatingBill = false;
    document.getElementById('manage_bill').style.top = "0px";
    this.currentBill = {
      id: 0,
      name: "",
      amount: 0,
      due: ""
    };
    console.log(this.updatingBill);
  }

  manageBill(bill: Bill){
    this.updatingBill = true;
    document.getElementById('manage_bill').style.top = "0px";
    this.currentBill = bill;
  }

  onNewBill(bill: Bill){
    this.bills.push(bill);
    document.getElementById('manage_bill').style.top = "-100vh";
    this.amountSum = 0;
    this.getTotal();
  }

  onUpdatedBill(bill: Bill){
    this.bills.forEach((cur, index) => {
      if(bill.id === cur.id){
        this.bills.splice(index, 1);
        this.bills.push(bill);
        this.amountSum = 0;
        this.getTotal();

        document.getElementById('manage_bill').style.top = "-100vh";

        this.currentBill = {
          id: 0,
          name: "",
          amount: 0,
          due: ""
        };
      }
    });
  }

  onRemoveBill(bill: Bill){
    this.billService.removeBill(bill.id).subscribe(() => {
      this.bills.forEach((cur, index) => {
        if(bill.id === cur.id){
          this.bills.splice(index, 1);
          document.getElementById('manage_bill').style.top = "-100vh";
          this.amountSum = 0;
          this.getTotal();
        }
      });
    });
  }

  

  getTotal(){
    this.bills.forEach(bill => {
      this.amountSum = this.amountSum + +bill.amount;
    });
  }





  // Income Management Functions

  openNewIncomeMenu(){
    this.updatingIncome = false;
    document.getElementById('manage_income').style.top = "0px";
    this.currentIncome = {
      id: 0,
      source: "",
      amount: 0,
      receive: ""
    };
    console.log(this.updatingIncome);
  }

  manageIncome(income: Income){
    this.updatingIncome = true;
    document.getElementById('manage_income').style.top = "0px";
    this.currentIncome = income;
  }

  onNewIncome(income: Income){
    this.incomes.push(income);
    document.getElementById('manage_income').style.top = "-100vh";
    this.incomeAmountSum = 0;
    this.getIncomeTotal();
  }

  onUpdatedIncome(income: Income){
    this.incomes.forEach((cur, index) => {
      if(income.id === cur.id){
        this.incomes.splice(index, 1);
        this.incomes.push(income);
        this.incomeAmountSum = 0;
        this.getIncomeTotal();

        document.getElementById('manage_income').style.top = "-100vh";

        this.currentIncome = {
          id: 0,
          source: "",
          amount: 0,
          receive: ""
        };
      }
    });
  }

  onRemoveIncome(income: Income){
    this.incomeService.removeIncome(income.id).subscribe(() => {
      this.incomes.forEach((cur, index) => {
        if(income.id === cur.id){
          this.incomes.splice(index, 1);
          document.getElementById('manage_income').style.top = "-100vh";
          this.incomeAmountSum = 0;
          this.getIncomeTotal();
        }
      });
    });
  }

  getIncomeTotal(){
    this.incomes.forEach(income => {
      this.incomeAmountSum = this.incomeAmountSum + +income.amount;
    });
  }
}

