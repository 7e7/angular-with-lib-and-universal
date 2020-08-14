export interface JbNutritionFactsSection {
  title?: string;
  subtitle?: string;
  value?: string | number;
  subSections?: JbNutritionFactsSection[];
}

export interface JbNutritionFacts {
  title: string;
  name: string;
  imageSrc?: string;
  imageAlt?: string; // image alt would be '' if no specified
  header: JbNutritionFactsSection;
  splashSection: JbNutritionFactsSection;
  coreDetails: JbNutritionFactsSection;
  optionalDetails?: JbNutritionFactsSection;
  footnote?: string;
  additionalInfoArray?: JbNutritionFactsSection[];
}
