import { Component, OnDestroy, OnInit } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { CommonModule } from '@angular/common';
import { InputRowComponent } from './input-row/input-row.component';
import { WordDisplayComponent } from './word-display/word-display.component';
import { GameService } from '../../services/game/game.service';

@Component({
  selector: 'app-typing-test',
  imports: [
    StatsComponent,
    CommonModule,
    InputRowComponent,
    WordDisplayComponent,
  ],
  templateUrl: './typing-test.component.html',
  styleUrl: './typing-test.component.scss',
})
export class TypingTestComponent implements OnInit, OnDestroy {
  constructor(public gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getWords().subscribe();
  }

  ngOnDestroy(): void {
    this.gameService.resetGame();
    console.log('Gane reset on component destruction');
  }
}
