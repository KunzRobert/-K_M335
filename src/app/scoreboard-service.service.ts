import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ScoreboardService {
  initHunt(){
    localStorage.setItem('schnitzelCount', '0');
    localStorage.setItem('kartoffelCount', '0');
    localStorage.setItem('startTime', Date.now().toString());
  }

  checkTimeAndGivePoints(startTime: number, timeGivenForTask: number) {
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    if(duration <= timeGivenForTask) {
      this.updateLocalStorage('schnitzelCount');
    } else {
      this.updateLocalStorage('kartoffelCount');
    }
  }

  updateLocalStorage(key: string){
    let value = localStorage.getItem(key);
    let count = value ? parseInt(value, 10) : 0;
    count += 1;
    localStorage.setItem(key, count.toString());
  }

  saveHunt() {
    const name = localStorage.getItem('name');
    const countSchnitzel = localStorage.getItem('schnitzelCount');
    const countKartoffel = localStorage.getItem('kartoffelCount');
    const startTime = parseInt(localStorage.getItem('startTime') || '0');
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2, '0')}.${now.getFullYear()}`;


    const hunt = {
      name: name,
      countSchnitzel: countSchnitzel,
      countKartoffel: countKartoffel,
      duration: duration,
      date: formattedDate
    };

    let hunts = JSON.parse(localStorage.getItem('hunts') || '[]');
    hunts.push(hunt);
    localStorage.setItem('hunts', JSON.stringify(hunts));
  }
}
