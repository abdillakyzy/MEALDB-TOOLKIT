import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../Http/settings";

const initialState = {
  latest: [],
  infoMeal: [],
  popular: [],
  randomIngredient: [],
  poplarInfo: [],
  randomMeal: [],
  country: [],
  countryInfo: [],
  search: [],
  alfavitMeal: []
};

export const getLatesMeal = createAsyncThunk(
  "latest/getLatestMeal",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const mealNumber = [
        53083, 53082, 53081, 53080, 53079, 53078, 53077, 53076,
      ];
      const results = await Promise.all(
        mealNumber.map(async (number) => {
          const result = await instance.get(`lookup.php?i=${number}`);
          return result.data.meals;
        })
      );
      const combineMeals = results.flat();
      dispatch(latestMeal(combineMeals));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getInfoMeal = createAsyncThunk(
  "infoMeal/getInfoMeal",
  async (elem, { rejectWithValue, dispatch }) => {
    try {
      const result = await instance.get(`lookup.php?i=${elem}`);
      dispatch(infoIngredientMeal(result.data.meals));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getPopular = createAsyncThunk(
  "popular/getPopular",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await instance.get("list.php?i=list");
      dispatch(getPopularMeal(res.data.meals));
      dispatch(getRandomIngredient(res.data.meals));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getPopularInfo = createAsyncThunk(
  "poplarInfo/getPopularInfo",
  async (elem, { rejectWithValue, dispatch }) => {
    try {
      const res = await instance.get(`filter.php?i=${elem}`);
      dispatch(popularInfoMeal(res.data.meals));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const getSearchMeals = createAsyncThunk(
  "search/getSearchMeals",
  async (elem, { dispatch }) => {
    const res = await instance.get(`search.php?s=${elem}`);
    dispatch(getSearchMeal(res.data.meals));
  }
);

export const getRandomMeal = createAsyncThunk(
  "randomMeal/getRandomMeal",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const random = [1, 2, 3, 4, 5, 6, 7, 8];
      const responses = await Promise.all(
        random.map(() => instance.get(`random.php`))
      );
      const randomMealsData = responses.map(
        (response) => response.data.meals[0]
      );
      dispatch(getRandom(randomMealsData));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getCountryMeals = createAsyncThunk(
  "country/getCountryMeals",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await instance.get(`list.php?a=list`);
      dispatch(getCountry(res.data.meals));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getCountryInfoMeals = createAsyncThunk(
  "countryInfo/getCountryInfoMeals",
  async (elem, { rejectWithValue, dispatch }) => {
    try {
      const res = await instance.get(`filter.php?a=${elem}`);
      dispatch(getCountryInfo(res.data.meals));
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const getAlfavitMeals = createAsyncThunk(
  "alfavitMeal/getAlfavitMeals",
  async (elem, { rejectWithValue, dispatch }) => {
    const res = await instance.get(`search.php?f=${elem}`);
    dispatch(getAlfavitMeal(res.data.meals));
  }
);

const mealSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    latestMeal: (state, action) => {
      state.latest = action.payload;
    },
    infoIngredientMeal: (state, action) => {
      state.infoMeal = action.payload;
    },
    getPopularMeal: (state, action) => {
      state.popular = action.payload;
    },
    getRandomIngredient: (state, action) => {
      state.randomIngredient = action.payload;
    },
    popularInfoMeal: (state, action) => {
      state.poplarInfo = action.payload;
    },
    getRandom: (state, action) => {
      state.randomMeal = action.payload;
    },
    getCountry: (state, action) => {
      state.country = action.payload;
    },
    getCountryInfo: (state, action) => {
      state.countryInfo = action.payload;
    },
    getSearchMeal: (state, action) => {
      state.search = action.payload;
    },
    getAlfavitMeal: (state, action) => {
      state.alfavitMeal = action.payload
    }
  },
});

export const {
  latestMeal,
  infoIngredientMeal,
  getPopularMeal,
  getRandomIngredient,
  popularInfoMeal,
  getRandom,
  getCountry,
  getCountryInfo,
  getSearchMeal,
  getAlfavitMeal
} = mealSlice.actions;

export default mealSlice.reducer;
