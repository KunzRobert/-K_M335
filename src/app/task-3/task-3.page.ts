import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItemDivider,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ScoreboardService } from '../scoreboard-service.service';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';

@Component({
  selector: 'app-task-3',
  templateUrl: './task-3.page.html',
  styleUrls: ['./task-3.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonCheckbox,
    IonItemDivider,
  ],
})
export class Task3Page implements OnInit {
  isCompleted = false;
  readonly QRCODECONTENT = 'M335@ICT-BZ';
  private scoreboardService = inject(ScoreboardService);
  startTime: number = 0;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.startTime = Date.now();
  }

  async startScan() {
    try {
      const barcode = await CapacitorBarcodeScanner.scanBarcode({ hint: 0 });

      if (barcode.ScanResult === this.QRCODECONTENT) {
        this.isCompleted = true;
        this.scoreboardService.checkTimeAndGivePoints(this.startTime, 50);
      } else {
        alert('Wrong QR Code');
      }
    } catch (err) {
      console.error('Error scanning barcode:', err);
      alert('Error scanning QR Code');
    }
  }

  navigateToTask4() {
    if (this.isCompleted) {
      this.router.navigate(['task-4']).then(() => {
        document.body.classList.remove('scanner-active');
      });
    }
  }

  backToStart() {
    this.router.navigate(['start-hunt']).then(() => {});
  }
}
