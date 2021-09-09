import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PayService } from '../pay.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css'],
})
export class PaymentGatewayComponent implements OnInit {
  paymentForm = new FormGroup({});
  library: any;

  constructor(private payment: PayService) {}

  ngOnInit(): void {
    this.paymentFormInit();
  }

  paymentFormInit() {
    this.paymentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });
  }

  isDate(val:any) {
    return Object.prototype.toString.call(val) === '[object Date]'
  }
  
  isObj(val:any) {
    return typeof val === 'object'
  }
  
  stringifyValue(val:any) {
    if (this.isObj(val) && !this.isDate(val)) {
      return JSON.stringify(val)
    } else {
      return val
    }
  }
  
  buildForm({ action, params }:{action:any,params:any}) {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)
  
    Object.keys(params).forEach(key => {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      input.setAttribute('value', this.stringifyValue(params[key]))
      form.appendChild(input)
    })
  
    return form
  }
  
  post(details:any) {
    const form = this.buildForm(details)
    document.body.appendChild(form)
    form.submit()
    form.remove()
  }

  submit() {
    console.log(this.paymentForm.value)
    this.payment.postData(this.paymentForm.value).subscribe(
      (response: any) => {
        console.log(response)
        let details = {
          action: "https://securegw-stage.paytm.in/theia/processTransaction",
          params: response
        }
        this.post(details)
      },
      (error) => {
        console.log(error);
      }
    );
    
  }
}