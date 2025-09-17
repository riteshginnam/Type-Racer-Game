import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LeaderboardEntry } from '../../models/leaderboard-entry.model';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent implements OnInit, AfterViewInit {
  showContent: boolean = false;
  leaderboard: LeaderboardEntry[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  totalPages: number = 0;
  showLeaderboardMessage: boolean = false;

  constructor(private leaderboardService: LeaderboardService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 10);
  }

  loadLeaderboardCount(): void {
    this.leaderboardService.getCount().subscribe({
      next: (response) => {
        this.totalRecords = response.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.showLeaderboardMessage = true;
      },
      error: (err) => {
        console.error('Error fetching leaderboard count: ', err);
        this.showLeaderboardMessage = true;
      },
    });
  }

  loadPage(page: number) {
    const start = (page - 1) * this.pageSize;
    const limit = this.pageSize;
    this.leaderboardService.getLeaderboard(start, limit).subscribe((data) => {
      this.leaderboard = data;
    });
  }

  ngOnInit(): void {
    this.loadLeaderboardCount();
    this.loadPage(this.currentPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }
}
