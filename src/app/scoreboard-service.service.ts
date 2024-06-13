import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  private startTime: number = 0;
  private endTime: number = 0;
  private userName: string = '';
  private topRuns: { name: string; time: number }[] = [];

  setUserName(userName: string) {
    this.userName = userName;
  }

  getUserName() {
    return this.userName;
  }

  startTimer() {
    this.startTime = Date.now();
  }

  stopTimer() {
    this.endTime = Date.now();
  }

  getElapsedTime() {
    const elapsedTimeInMilliseconds = this.endTime - this.startTime;
    const elapsedTimeInSeconds = elapsedTimeInMilliseconds / 1000;
    return Number(elapsedTimeInSeconds.toFixed(2));
  }

  async addRun(name: string) {
    const elapsedTime = this.getElapsedTime();
    this.topRuns.push({ name, time: elapsedTime });
    this.topRuns.sort((a, b) => a.time - b.time);
    if (this.topRuns.length > 5) {
      this.topRuns.pop();
    }
    await Preferences.set({
      key: 'topRuns',
      value: JSON.stringify(this.topRuns),
    });
  }

  async getTopRuns() {
    const result = await Preferences.get({ key: 'topRuns' });
    this.topRuns = result.value ? JSON.parse(result.value) : [];
    return this.topRuns;
  }
}
