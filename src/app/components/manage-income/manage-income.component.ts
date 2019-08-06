import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

// Models
import {Income} from '../../models/Income';

// Services
import {IncomeService} from '../../services/income.service';

@Component({
  selector: 'app-manage-income',
  templateUrl: './manage-income.component.html',
  styleUrls: ['./manage-income.component.scss']
})
export class ManageIncomeComponent implements OnInit {

  // Properties
  @Output() newIncome: EventEmitter<Income> = new EventEmitter();
  @Output() addedIncome: EventEmitter<Income> = new EventEmitter();
  @Output() updatedIncome: EventEmitter<Income> = new EventEmitter();
  @Output() deletedIncome: EventEmitter<Income> = new EventEmitter();
  @Input() currentIncome: Income;
  @Input() updatingIncome: boolean;

  incomes: Income[];
  income: Income;

  constructor(private incomeService: IncomeService) { }

  ngOnInit() {
    this.incomeService.getIncome().subscribe(incomes => {
      this.incomes = incomes;
    });
  }

  addIncome(source, amount, receive){
    this.incomeService.saveIncome({source, amount, receive} as Income).subscribe(income => {
      this.addedIncome.emit(income);
    });
  }

  updateIncome(){
    this.incomeService.updateIncome(this.currentIncome).subscribe(income => {
      this.updatedIncome.emit(income);
    });
  }

  removeIncome(){
    this.incomeService.updateIncome(this.currentIncome).subscribe(income => {
      this.deletedIncome.emit(income);
    });
  }

  closeMenu(){
    document.getElementById('manage_income').style.top = "-100vh";
  }

}
