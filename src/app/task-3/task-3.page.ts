import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItemDivider,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {BarcodeScanner} from '@capacitor-community/barcode-scanner';
import {Router} from "@angular/router";
import {ScoreboardService} from "../scoreboard-service.service";

@Component({
  selector: 'app-task-3',
  templateUrl: './task-3.page.html',
  styleUrls: ['./task-3.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCheckbox, IonItemDivider]
})
export class Task3Page {

  isCompleted = false;

  constructor(private router: Router, private scoreboardService: ScoreboardService ) { }

  async startScan() {
    try {
      await BarcodeScanner.hideBackground();
      document.body.classList.add('scanner-active');

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        if (result.content === 'M335@ICT-BZ') {
          this.isCompleted = true;
        } else {
          alert('Incorrect QR code');
        }
      }
    } catch (error) {
      console.error('Scan failed:', error);
      alert('Scan failed. Please try again.');
    } finally {
      await BarcodeScanner.showBackground();
      document.body.classList.remove('scanner-active');
      await BarcodeScanner.stopScan();
    }
  }

  navigateToTask4() {
    if (this.isCompleted) {
      this.scoreboardService.stopTimer();
      this.scoreboardService.addRun(this.scoreboardService.getUserName());
      this.router.navigate(['task-4']).then(() => {
        document.body.classList.remove('scanner-active');
      });
    }
  }

  backToStart() {
    this.router.navigate(['start-hunt']).then(() => {
    });
  }
}
