export const CUISINE_TAGS = [
  'american',
  'barbecue',
  'breakfast',
  'burgers',
  'caribbean',
  'chinese',
  'desserts',
  'fast-food',
  'french',
  'greek',
  'indian',
  'italian',
  'japanese',
  'korean',
  'lebanese',
  'mediterranean',
  'mexican',
  'pizza',
  'seafood',
  'sushi',
  'thai',
  'turkish',
  'vegan-friendly',
  'vietnamese',
] as const;

export type CuisineTag = (typeof CUISINE_TAGS)[number];

export const DIETARY_TAGS = [
  'vegetarian',
  'vegan',
  'gluten-free',
  'halal',
  'kosher',
  'dairy-free',
  'nut-free',
  'low-carb',
] as const;

export type DietaryTag = (typeof DIETARY_TAGS)[number];
