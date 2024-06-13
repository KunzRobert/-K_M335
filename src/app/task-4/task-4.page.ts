import { Component, OnInit } from '@angular/core';
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

import { Motion } from '@capacitor/motion';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Router } from '@angular/router';
import { ScoreboardService } from '../scoreboard-service.service';

@Component({
  selector: 'app-task-4',
  templateUrl: './task-4.page.html',
  styleUrls: ['./task-4.page.scss'],
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
export class Task4Page implements OnInit {
  isCompleted: boolean = false;

  constructor(
    private router: Router,
    private scoreboardService: ScoreboardService
  ) {}

  ngOnInit() {
    Motion.addListener('accel', event => {
      const { x, y } = event.accelerationIncludingGravity;

      if (this.isUpsideDown(x, y) && !this.isCompleted) {
        this.isCompleted = true;
        this.vibratePhone();
        console.log('The phone is upside down, isCompleted set to true');
      }
    }).then();
  }

  isUpsideDown(x: number, y: number): boolean {
    return y < -9;
  }

  vibratePhone() {
    Haptics.impact({ style: ImpactStyle.Heavy }).then();
  }

  navigateToScoreboard() {
    this.scoreboardService.stopTimer();
    this.scoreboardService.addRun(this.scoreboardService.getUserName());
    this.router.navigate(['scoreboard']).then();
  }

  backToStart() {
    this.router.navigate(['start-hunt']).then();
  }
}
