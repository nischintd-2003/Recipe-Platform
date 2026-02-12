export const APP_NAME = "Fudo";

export const ROUTES = {
  HOME: "/",
  RECIPES: "/recipes",
  RECIPE_DETAILS: "/recipe/:id",
  MY_RECIPES: "/my-recipes",
  FAVORITES: "/favorites",
  LOGIN: "/login",
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
  },
  RECIPE: {
    BASE: "/recipe",
    USER: "/recipe/user",
    BY_ID: (id: string | number) => `/recipe/${id}`,
    RATE: (id: number) => `/recipe/${id}/rate`,
    FAVORITE: (id: number) => `/recipe/${id}/favourite`,
    COMMENT: (id: number) => `/recipe/${id}/comment`,
    COMMENT_BY_ID: (recipeId: number, commentId: number) =>
      `/recipe/${recipeId}/comment/${commentId}`,
  },
  FAVORITES: "/favourites",
} as const;

export const VALIDATION = {
  AUTH: {
    PASSWORD_MIN_LEN: 6,
    USERNAME_MIN_LEN: 2,
  },
  RECIPE: {
    TITLE_MIN_LEN: 3,
    INGREDIENTS_MIN_LEN: 10,
    STEPS_MIN_LEN: 10,
    PREP_TIME_MIN: 1,
  },
  FILE: {
    MAX_SIZE_BYTES: 5 * 1024 * 1024,
    MAX_SIZE_MB: 5,
  },
} as const;

export const CONFIG = {
  DEBOUNCE_DELAY_MS: 500,
  TOAST_AUTO_CLOSE_MS: 3000,
  PAGINATION_LIMIT: 9,
} as const;

export const MESSAGES = {
  VALIDATION: {
    INVALID_EMAIL: "Invalid email address",
    PASSWORD_SHORT: `Password must be at least ${VALIDATION.AUTH.PASSWORD_MIN_LEN} characters`,
    USERNAME_SHORT: `Name must be at least ${VALIDATION.AUTH.USERNAME_MIN_LEN} characters`,
    TITLE_SHORT: `Title must be at least ${VALIDATION.RECIPE.TITLE_MIN_LEN} characters`,
    INGREDIENTS_SHORT: "List at least a few ingredients",
    STEPS_SHORT: "Describe the steps clearly",
    PREP_TIME_INVALID: "Prep time must be positive",
    URL_INVALID: "Must be a valid URL",
    FILE_TOO_LARGE: `File is too large (Max ${VALIDATION.FILE.MAX_SIZE_MB}MB)`,
  },
  SUCCESS: {
    RECIPE_CREATED: "Recipe published successfully!",
    RECIPE_UPDATED: "Recipe updated successfully!",
    RECIPE_DELETED: "Recipe deleted successfully",
    COMMENT_ADDED: "Comment added",
    LOGGED_IN: "Welcome back!",
  },
  ERROR: {
    GENERIC: "Something went wrong",
    LOGIN_FIRST: "Please log in to perform this action",
    UPLOAD_FAILED: "Failed to upload image",
    LOAD_FAILED: "Failed to load data",
    DELETE_FAILED: "Failed to delete",
    ADD_FAILED: "Failed to add",
    UPDATE_FAILED: "Update Failed",
    OP_FAILED: "Operation failed",
  },
  UI: {
    NO_RECIPES: "No recipes found. Be the first to add one!",
    CONFIRM_DELETE_TITLE: "Delete Recipe?",
    CONFIRM_DELETE_DESC:
      "Are you sure you want to delete this recipe? This action cannot be undone.",
  },
  HOME: {
    FRESH_RECIPE_TEXT: "Cook Fresh Recipes",
    INSIGHTS_TEXT: "Insights",
    PAGE_TEXT: "Page",
  },
  RECIPE_DETAILS: {
    GO_BACK: "Go Back",
    RECIPE_BACK: "Back to Recipes",
    REVIEWS: "reviews",
    INGRIDIENTS: "Ingredients",
    CREATED_BY: "Created by",
    INSTRUCTIONS: "Instructions",
  },
  MY_RECIPE: {
    TITLE: "My Recipes",
    CREATE_OWN_RECIPE:
      "Click the 'Create Recipe' button to share your culinary skills!",
  },
  FAVORITE_RECIPE: {
    TITLE: "Favorite Recipes",
    YOUR_FAVORITE: "Your Favorites",
    NO_FAVORITE_YET: "No favorites yet",
    SAVE_FAVORITE: "Save recipes you love to find them here easily!",
  },
} as const;

export const BUTTON = {
  EDIT: "Edit",
  DELETE: "Delete",
  CANCEL: "Cancel",
  SAVE: "Save",
  POST: "Post",
  DELETING: "Deleting...",
  SUBMITTING: "Submitting...",
  SAVE_CHANGES: "Save Changes",
  SUBMIT_RECIPE: "Submit Recipe",
  UPLOADING: "Uploading...",
  LOGIN: "Login",
  LOGOUT: "Logout",
  FILTERS: "Filters",
  CLEAR_ALL: "Clear All",
  SHOW_RESULTS: "Show Results",
  GO_HOME: "Go Home",
};

export const COMPONENTS = {
  AUTHMODAL: {
    LOGIN_ACCOUNT_TEXT: "Already have an account?",
    SIGNUP_ACCOUNT_TEXT: "Don't have an account?",
    LOGIN: "Login",
    SIGNUP: "Sign Up",
    PROCESSING: "Processing...",
  },
  COMMENTS_SECTION: {
    COMMENTS: "Comments",
    NO_COMMENTS_YET: "No comments yet. Be the first to share your thoughts!",
    PLEASE_LOGIN: "Please log in to leave a comment.",
    DELETE_COMMENT: "Delete Comment?",
    DELETE_COMMENT_DESCRIPTION: "Are you sure you want to remove this comment?",
  },
  CREATE_RECIPE_MODAL: {
    COOKING_INSTRUCTIONS: "COOKING INSTRUCTIONS",
    STEPS_DESCRIPTION: "Describe the steps to prepare your dish...",
    COVER_IMAGE: "COVER IMAGE",
    INGRIDIENTS: "INGREDIENTS",
    INGRIDIENTS_TEXT: "List one ingredient per line (e.g. 2 cups Flour)",
    FILL_DETAILS:
      "Fill in the details below to share your masterpiece with the food community.",
    RECIPE_TITLE: "RECIPE TITLE",
    PREP_TIME: "PREP TIME (MINS)",
  },
  GLOBAL_FAB: {
    CREATE_RECIPE: "Create Recipe",
  },
  IMAGE_UPLOAD: {
    UPLOAD_IMAGE: "Upload Cover Image",
  },
  NAVBAR: {
    SIGNED_AS: "Signed in as",
  },
  RATE_RECIPE: {
    RECIPE_TRIED: "Have you tried this recipe?",
    FEEDBACK: "Thanks for your feedback!",
    YOU_RATED: "You rated this recipe",
  },
  RECIPE_FILTER: {
    FILTER_SORT: "Filter & Sort",
    SORT_BY: "Sort By",
    NEW_FIRST: "Newest First",
    HIGH_RATED_FIRST: "Highest Rated",
    MINIMUM_RATING: "Minimum Rating",
    MAX_PREP_TIME: "Max Prep Time",
    MAX_NUM_TIME: 240,
    TEN: "10m",
  },
} as const;

export const PLACEHOLDER = {
  WRITE_COMMENT: "Write a comment...",
};
