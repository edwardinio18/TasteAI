export interface Recipe {
  id: string;
  uniqueId?: string; // Keeping track of recipes in a unique way (<id>-<searchQuery>), because id is not unique in this case
  title: string;
  time: string;
  ingredients: string[];
  instructions: string[];
}

export interface Route {
  title: string;
  path: string;
}
