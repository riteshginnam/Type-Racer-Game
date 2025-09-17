import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stats } from '../../models/stats.model';
import { Word } from '../../models/word.model';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private statsSubject = new BehaviorSubject<Stats>({
    cleanSpeed: NaN,
    accuracy: NaN,
    rawSpeed: NaN,
    allWords: NaN,
    incorrectWords: NaN,
    allLetters: NaN,
    incorrectLetters: NaN,
  });

  stats$ = this.statsSubject.asObservable();

  updateStats(newStats: Stats): void {
    this.statsSubject.next(newStats);
    console.log('Stats updated');
  }

  resetStats(): void {
    this.statsSubject.next({
      cleanSpeed: NaN,
      accuracy: NaN,
      rawSpeed: NaN,
      allWords: NaN,
      incorrectWords: NaN,
      allLetters: NaN,
      incorrectLetters: NaN,
    });
  }

  private calculateAccuracy(
    correctLetters: number,
    totalLetters: number
  ): number {
    return (correctLetters / totalLetters) * 100;
  }

  private calculateRawSpeed(totalLetters: number, timeElapsed: number): number {
    const timeElapsedInMinutes = timeElapsed / 60;
    if (timeElapsedInMinutes <= 0) {
      console.warn('Warning: Value is too small!');
      return 0;
    }
    return totalLetters / 4 / timeElapsedInMinutes;
  }

  private calculateCleanSpeed(rawSpeed: number, accuracy: number): number {
    return rawSpeed * (accuracy / 100);
  }

  private compareWords(
    allWords: string[],
    wordsTyped: string[]
  ): {
    totalLetters: number;
    correctLetters: number;
    incorrectLetters: number;
    incorrectWords: number;
  } {
    let totalLetters = 0;
    let correctLetters = 0;
    let incorrectLetters = 0;
    let incorrectWords = 0;

    for (let i = 0; i < allWords.length; i++) {
      const targetWord = new Word(allWords[i]);
      const typedWord = new Word(wordsTyped[i]);

      totalLetters += targetWord.getLetterNumber();
      correctLetters += typedWord.compareLetters(targetWord);
      incorrectLetters +=
        targetWord.getLetterNumber() - typedWord.compareLetters(targetWord);

      if (!typedWord.equals(targetWord)) {
        incorrectWords++;
      }
    }

    return { totalLetters, correctLetters, incorrectLetters, incorrectWords };
  }

  calculateStats(
    timeElapsed: number,
    allWords: string[],
    wordsTyped: string[]
  ): void {
    if (timeElapsed <= 0) {
      console.warn('Time elapsed should be greater than zero!');
      return;
    }
    if (!allWords || allWords.length === 0) {
      throw new Error('All words array is empty!');
    }
    if (!wordsTyped || wordsTyped.length === 0) {
      throw new Error('Error: wordsTyped array is empty.');
    }

    const wordComparison = this.compareWords(allWords, wordsTyped);
    const accuracy = this.calculateAccuracy(
      wordComparison.correctLetters,
      wordComparison.totalLetters
    );
    const rawSpeed = this.calculateRawSpeed(
      wordComparison.totalLetters,
      timeElapsed
    );
    const cleanSpeed = this.calculateCleanSpeed(rawSpeed, accuracy);

    const newStats: Stats = {
      cleanSpeed: parseFloat(cleanSpeed.toFixed(2)),
      accuracy: parseFloat(accuracy.toFixed(2)),
      rawSpeed: parseFloat(rawSpeed.toFixed(2)),
      allWords: allWords.length,
      incorrectWords: wordComparison.incorrectWords,
      allLetters: wordComparison.totalLetters,
      incorrectLetters: wordComparison.incorrectLetters,
    };

    this.updateStats(newStats);
  }
}
