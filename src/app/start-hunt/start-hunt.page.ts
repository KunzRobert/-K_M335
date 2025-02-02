import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';
import { ScoreboardService } from '../scoreboard-service.service';

@Component({
  selector: 'app-start-hunt',
  templateUrl: './start-hunt.page.html',
  styleUrls: ['./start-hunt.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonItemDivider,
    IonItem,
    IonInput,
    IonCheckbox,
  ],
})
export class StartHuntPage implements OnInit {
  userName: string = '';
  isCompleted = false;

  constructor(
    private router: Router,
    private scoreboardService: ScoreboardService
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.checkCompletion();
    }, 100);

    this.userName = '';
  }

  checkCompletion() {
    this.isCompleted = this.userName.trim().length > 0;
  }

  navigateToTask1() {
    if (this.isCompleted) {
      this.scoreboardService.initHunt();
      this.router.navigate(['task-1']).then();
    }
  }
}
