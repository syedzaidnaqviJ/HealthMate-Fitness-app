import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  waterIntake: number = 0;
  steps: number = 0;
  sleep: number = 0;
  mood: string = '';

  waterLog: number = 0;
  stepsLog: number = 0;
  sleepLog: number = 0;
  moodLog: string = '';

  darkMode = false;
  currentYear = new Date().getFullYear();

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    const root = document.documentElement;
    if (this.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  logWater() {
    this.waterLog += this.waterIntake;
    this.waterIntake = 0;
  }

  logSteps() {
    this.stepsLog += this.steps;
    this.steps = 0;
  }

  logSleep() {
    this.sleepLog += this.sleep;
    this.sleep = 0;
  }

  logMood() {
    this.moodLog = this.mood;
    this.mood = ''
  }
}