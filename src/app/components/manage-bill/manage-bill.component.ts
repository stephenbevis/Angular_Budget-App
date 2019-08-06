import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

// Models
import {Bill} from '../../models/Bill';

// Services
import {BillService} from '../../services/bill.service';

@Component({
  selector: 'app-manage-bill',
  templateUrl: './manage-bill.component.html',
  styleUrls: ['./manage-bill.component.scss']
})
export class ManageBillComponent implements OnInit {

  // Properties
  @Output() newBill: EventEmitter<Bill> = new EventEmitter();
  @Output() addedBill: EventEmitter<Bill> = new EventEmitter();
  @Output() updatedBill: EventEmitter<Bill> = new EventEmitter();
  @Output() deletedBill: EventEmitter<Bill> = new EventEmitter();
  @Input() currentBill: Bill;
  @Input() updatingBill: boolean;

  bills: Bill[];
  bill: Bill;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.billService.getBills().subscribe(bills => {
      this.bills = bills;
    });
  }

  addBill(name, amount, due){
    this.billService.saveBill({name, amount, due} as Bill).subscribe(bill => {
      this.addedBill.emit(bill);
    });
  }

  updateBill(){
    this.billService.updateBill(this.currentBill).subscribe(bill => {
      this.updatedBill.emit(bill);
    });
  }

  removeBill(){
    this.billService.updateBill(this.currentBill).subscribe(bill => {
      this.deletedBill.emit(bill);
    });
  }

  closeMenu(){
    document.getElementById('manage_bill').style.top = "-100vh";
  }
}
