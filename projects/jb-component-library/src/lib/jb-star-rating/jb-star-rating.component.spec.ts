import { JbStarRatingComponent } from './jb-star-rating.component';

describe('JbStarRatingComponent', () => {
  let mockStarsComponent;

  beforeEach(() => {
    mockStarsComponent = new JbStarRatingComponent();
  });

  it('should set roundedRating to 5 if rating is greater than 5', () => {
    mockStarsComponent.rating = 10;

    expect(mockStarsComponent.roundedRating).toBe(5);
  });

  it('should round roundedRating up to the nearest 0.5 when rating is not a whole number', () => {
    mockStarsComponent.rating = 3.1;
    expect(mockStarsComponent.roundedRating).toBe(3.5);

    mockStarsComponent.rating = 2.7;
    expect(mockStarsComponent.roundedRating).toBe(3);
  });

  it('should set roundedRating to rating when rating is a whole number and greater or equal to 5', () => {
    mockStarsComponent.rating = 4;
    expect(mockStarsComponent.roundedRating).toBe(4);
  });

  it('should set roundedRating to rating when rating is multiples of 0.5 and greater or equal to 5', () => {
    mockStarsComponent.rating = 1.5;
    expect(mockStarsComponent.roundedRating).toBe(1.5);
  });

  describe('isFullStar', () => {
    it('should return true if rating is 3.5 and starNumber is 2', () => {
      mockStarsComponent.rating = 3.5;
      expect(mockStarsComponent.isFullStar(2)).toBe(true);
    });

    it('should return false if rating is 3.5 and starNumber is 4', () => {
      mockStarsComponent.rating = 3.5;
      expect(mockStarsComponent.isFullStar(4)).toBe(false);
    });

    it('should return false if rating is 3.5 and starNumber is 5', () => {
      mockStarsComponent.rating = 3.5;
      expect(mockStarsComponent.isFullStar(5)).toBe(false);
    });
  });

  describe('isHalfStar', () => {
    it('should return false if rating is 3.5 and starNumber is 2', () => {
      mockStarsComponent.rating = 3.5;
      expect(mockStarsComponent.isHalfStar(2)).toBe(false);
    });

    it('should return true if rating is 3.5 and starNumber is 4', () => {
      mockStarsComponent.rating = 3.5;
      expect(mockStarsComponent.isHalfStar(4)).toBe(true);
    });

    it('should return false if rating is 3.5 and starNumber is 5', () => {
      mockStarsComponent.rating = 3.5;
      expect(mockStarsComponent.isHalfStar(5)).toBe(false);
    });
  });

  describe('isEmptyStar', () => {
    it('should return false if rating is 3.5 and starNumber is 2', () => {
      mockStarsComponent.rating = 3.5;
      expect(mockStarsComponent.isEmptyStar(2)).toBe(false);
    });

    it('should return false if rating is 3.5 and starNumber is 4', () => {
      mockStarsComponent.rating = 3.5;
      expect(mockStarsComponent.isEmptyStar(4)).toBe(false);
    });

    it('should return true if rating is 3.5 and starNumber is 5', () => {
      mockStarsComponent.rating = 3.5;
      expect(mockStarsComponent.isEmptyStar(5)).toBe(true);
    });

    it('should return false if rating is 3 and starNumber is 3', () => {
      mockStarsComponent.rating = 3.5;
      expect(mockStarsComponent.isEmptyStar(3)).toBe(false);
    });
  });
});
