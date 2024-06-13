import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ScoreboardService } from '../scoreboard-service.service';
import {
  IonButton,
  IonCardContent,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
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
    IonList,
    IonRow,
    IonCol,
    IonCardContent,
    IonGrid,
  ],
})
export class ScoreboardPage implements OnInit {
  runs: any[] = [];

  constructor(
    private router: Router,
    private scoreboardService: ScoreboardService
  ) {}

  ngOnInit() {
    this.scoreboardService.saveHunt();
    this.getHunts();
  }

  navigateToStart() {
    this.router.navigate(['start-hunt']).then();
  }

  navigateToHome() {
    this.router.navigate(['home']).then();
  }

  getHunts() {
    const hunts = JSON.parse(localStorage.getItem('hunts') || '[]');
    this.runs = hunts.reverse().slice(0, 15);
  }

  clearScoreboard() {
    localStorage.removeItem('hunts');
    this.runs = [];
  }
}
