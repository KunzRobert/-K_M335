import {Component, OnDestroy, OnInit} from '@angular/core';
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

import { Motion } from '@capacitor/motion';

@Component({
  selector: 'app-task-4',
  templateUrl: './task-4.page.html',
  styleUrls: ['./task-4.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCheckbox, IonItemDivider]
})
export class Task4Page implements OnInit {

  isCompleted: boolean = false;

  constructor() {}

  ngOnInit() {
    Motion.addListener('accel', (event) => {
      const {x, y, z} = event.accelerationIncludingGravity;

      if (this.isUpsideDown(x, y, z)) {
        this.isCompleted = true;
        console.log('The phone is upside down, isCompleted set to true');
      } else {
        this.isCompleted = false;
        console.log('The phone is not upside down, isCompleted set to false');
      }
    }).then(r => {});
  }

  isUpsideDown(x: number, y: number, z: number): boolean {
    return y < -9;
  }
}
