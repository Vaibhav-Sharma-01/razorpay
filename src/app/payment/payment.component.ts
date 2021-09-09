import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  DEV = document.domain === 'localhost'


  constructor() { }

  ngOnInit(): void {
  }

  loadScript(src: any) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  async displayRazorpay() {
		const res = await this.loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:3000/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)

		const options = {
			key: this.DEV ? 'rzp_test_JcdUqCJckM0Q5X' : 'rzp_live_PQbbZIQzemeiMM',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Donation',
			description: 'Thank you for nothing. Please give us some money',
			image: 'http://localhost:3000/logo.svg',
			handler: function (response: any) {
        alert("Transaction Successfull")
				alert("Payment ID "+response.razorpay_payment_id)
				alert("Order ID "+response.razorpay_order_id)
				alert("Payment Signature "+response.razorpay_signature)
			},
			prefill: {
				email: 'sdfdsjfh2@ndsfdf.com',
				contact: '7894561230'
			}
		}
    const _window = window as any
		const paymentObject = new _window.Razorpay(options)
		paymentObject.open()

  }
}
