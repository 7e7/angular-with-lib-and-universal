import { Component, Input } from '@angular/core';

@Component({
  selector: 'jb-star-rating',
  template: `
    <ng-container *ngFor="let starNumber of stars; let last = last">
      <jb-icon
        *ngIf="isFullStar(starNumber)"
        [ngClass]="{ pr1: !last }"
        name="starFull"
      ></jb-icon>
      <jb-icon
        *ngIf="isHalfStar(starNumber)"
        [ngClass]="{ pr1: !last }"
        name="starHalf"
      ></jb-icon>
      <jb-icon
        *ngIf="isEmptyStar(starNumber)"
        [ngClass]="{ pr1: !last }"
        name="starEmpty"
      ></jb-icon>
    </ng-container>
  `,
  host: {
    class: 'bright-blue',
    '[attr.aria-label]': 'ariaLabel',
  },
})
export class JbStarRatingComponent {
  @Input() rating = 0;

  stars: number[] = [1, 2, 3, 4, 5];

  get roundedRating(): number {
    return this.rating > 5 ? 5 : Math.ceil(this.rating * 2) / 2;
  }

  get ariaLabel(): string {
    return `rated ${this.roundedRating} out of ${this.stars.length} stars`;
  }

  isFullStar(starNumber: number): boolean {
    return starNumber <= this.roundedRating;
  }

  isHalfStar(starNumber: number): boolean {
    return starNumber - this.roundedRating === 0.5;
  }

  isEmptyStar(starNumber: number): boolean {
    return !this.isHalfStar(starNumber) && starNumber > this.roundedRating;
  }
}
