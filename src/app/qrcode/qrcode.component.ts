import { Component, OnInit, ViewChild } from '@angular/core';
import QrScanner from 'qr-scanner';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  @ViewChild('videoPlayer') videoElement: any;  
  qrScanner: any;
  decode: any;
  count = 0
  async ngOnInit() {
    QrScanner.WORKER_PATH="scripts.js"
    await QrScanner.hasCamera()
    await QrScanner.listCameras(true).then(res=>{
      this.qrScanner = new QrScanner(this.videoElement.nativeElement, result => this.decode = result,error=>console.log(error));
      this.qrScanner.setCamera(res[0].id);
    });

    
  }

  start(){
    this.qrScanner.start();
    this.count = 1
  }

  stop(){
    this.qrScanner.stop();
    this.count = 0
  }


}
