import { Component,ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  customer:any[]=[]
  transaction:any[]=[]
  data:any[]=[]
  inputValue:string =""
  input:string =""

  selectedCustomerTransactions: any[] = [];
  chart: Chart | undefined;
  @ViewChild('transactionsChart') transactionsChart!: ElementRef;

  constructor(private _DataService:DataService){}
  ngOnInit():void{
    this.getCustomer()
    this.getTransaction()

  }
  getCustomer(){
    this._DataService.getCustomer().subscribe({
      next:(res)=>{
        console.log(res);
        this.customer = res
        
      }
    })

  }

  getTransaction(){
    this._DataService.getTransaction().subscribe({
      next:(res)=>{
        console.log(res);
        this.transaction = res
        this.getamount()
      }
    })

  }

  getamount(){
    this.data= this.customer.map((a)=>{
      const Adata = this.transaction.filter((b)=> b.customer_id==a.id)
      const totalAmount = Adata.reduce((c,b)=> c + b.amount , 0 )
      return {
        id:a.id ,
        name:a.name,
        totalAmount:totalAmount
      }
     
    })
    console.log(this.data);
  }


  renderChart(): void {
    const ctx = (this.transactionsChart.nativeElement as HTMLCanvasElement).getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.selectedCustomerTransactions.map(t => t.date),
        datasets: [{
          label: 'Amount',
          data: this.selectedCustomerTransactions.map(t => t.amount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  showTransactions(customerId: number) {
    this.selectedCustomerTransactions = this.transaction.filter(
      transaction => transaction.customer_id == customerId
    );
    if (this.chart) {
      this.chart.destroy();
    }
    setTimeout(() => {
      this.renderChart();
    }, 0);

  }
}

