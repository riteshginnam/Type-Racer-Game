import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GameService } from '../../../services/game/game.service';

@Component({
  selector: 'app-input-row',
  imports: [CommonModule],
  templateUrl: './input-row.component.html',
  styleUrl: './input-row.component.scss',
})
export class InputRowComponent implements AfterViewInit {
  @ViewChild('wordInput') wordInput!: ElementRef<HTMLInputElement>;
  showContent: boolean = false;

  constructor(private gameService: GameService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 20);
  }

  onInputChange(): void {
    const userInput = this.wordInput.nativeElement.value;
    this.gameService.updateUserInput(userInput);
  }

  resetInput(): void {
    if (this.wordInput) {
      this.wordInput.nativeElement.value = '';
    }
    this.gameService.updateUserInput('');
  }

  onKeydown(event: KeyboardEvent): void {
    const userInput = this.wordInput.nativeElement.value;

    if (!this.gameService.gameStarted) {
      this.gameService.startGame();
    }

    this.gameService.updateUserInput(userInput);

    if (event.key === ' ') {
      event.preventDefault();
      this.gameService.onNextWord();
      this.resetInput();
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      this.gameService.resetGame();
      this.resetInput();
      return;
    }

    if (event.key === 'Backspace' && event.ctrlKey) {
      this.gameService.removeAllStylingFromCurrentWord();
      this.resetInput();
      return;
    }

    if (event.key === 'Backspace') {
      this.gameService.removeLastCharacterStyling();
    }
  }

  onRedoClick(): void {
    this.gameService.resetGame();
    this.resetInput();
  }
}
