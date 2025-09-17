import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { GameService } from '../../../services/game/game.service';

@Component({
  selector: 'app-word-display',
  imports: [CommonModule],
  templateUrl: './word-display.component.html',
  styleUrl: './word-display.component.scss',
})
export class WordDisplayComponent implements AfterViewInit {
  showContent: boolean = false;
  constructor(public gameService: GameService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 10);
  }
}
