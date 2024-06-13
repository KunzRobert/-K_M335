import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { Geolocation } from '@capacitor/geolocation';
import { haversineDistance } from '../geolocation.utils';
import { Router } from '@angular/router';
import { ScoreboardService } from '../scoreboard-service.service';
import {Haptics, ImpactStyle} from "@capacitor/haptics";

@Component({
  selector: 'app-task-1',
  templateUrl: './task-1.page.html',
  styleUrls: ['./task-1.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonCheckbox,
    IonItemDivider,
    IonButton,
  ],
})
export class Task1Page implements OnInit, OnDestroy {
  isCompleted = false;
  distanceToTarget: number | null = null;

  readonly TARGET_COORDS = {
    latitude: 47.071945403994924,
    longitude: 8.348885173299777,
  };
  readonly DISTANCE_THRESHOLD = 30;

  watchId: string | null = null;
  private scoreboardService = inject(ScoreboardService);
  startTime: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startWatchingPosition().then();
    this.startTime = Date.now();
  }

  ngOnDestroy() {
    this.stopWatchingPosition();
  }

  async startWatchingPosition() {
    try {
      this.watchId = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 2000,
          maximumAge: 0,
        },
        (position, err) => {
          if (err) {
            console.error('Error watching position:', err);
            return;
          }

          if (position) {
            const currentCoords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            const distance = haversineDistance(
              currentCoords,
              this.TARGET_COORDS
            );

            this.distanceToTarget = distance;

            this.isCompleted = distance <= this.DISTANCE_THRESHOLD;

            if(this.isCompleted) {
              this.vibratePhone()
              this.scoreboardService.checkTimeAndGivePoints(this.startTime, 120);
            }

          }
        }
      );
    } catch (error) {
      console.error('Error starting position watch:', error);
    }
  }

  stopWatchingPosition() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId }).then();
      this.watchId = null;
    }
  }

  navigateToTask2() {
    if (this.isCompleted) {
      this.router.navigate(['task-2']).then(() => {});
    }
  }

  backToStart() {
    this.router.navigate(['start-hunt']).then();
  }

  vibratePhone() {
    Haptics.impact({ style: ImpactStyle.Heavy }).then();
  }
}
