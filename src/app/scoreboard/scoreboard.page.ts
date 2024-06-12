import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";
import { ScoreboardService } from '../scoreboard-service.service';
import {
  IonButton, IonCheckbox,
  IonContent,
  IonHeader, IonInput,
  IonItem,
  IonItemDivider, IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.page.html',
  styleUrls: ['./scoreboard.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonItemDivider, IonItem, IonInput, IonCheckbox, IonList]
})
export class ScoreboardPage implements OnInit{

  topRuns: {name: string, time: number}[] = [];

  constructor(private router: Router, private scoreboardService: ScoreboardService) { }

  async ngOnInit() {
    this.topRuns = await this.scoreboardService.getTopRuns();
  }

  navigateToStart(){
    this.router.navigate(['start-hunt']).then(r => {});
  }
  navigateToHome(){
    this.router.navigate(['home']).then(r => {});
  }
}
