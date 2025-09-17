import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Stats } from '../../../models/stats.model';
import { StatsService } from '../../../services/game/stats.service';

@Component({
  selector: 'app-stats',
  imports: [CommonModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements OnInit, AfterViewInit {
  showContent: boolean = false;
  showStats = true;
  stats: Stats = {
    cleanSpeed: 0,
    rawSpeed: 0,
    accuracy: 0,
    allWords: 0,
    incorrectWords: 0,
    allLetters: 0,
    incorrectLetters: 0,
  };

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.stats$.subscribe((newStats: Stats) => {
      this.stats = newStats;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 30);
  }

  toggleStats(): void {
    this.showStats = !this.showStats;
  }
}
