import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Match {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  facility: any;
  players: any[];
  maxPlayers: number;
  sport: string;
  price: number;
  status: string;
}

interface Facility {
  _id: string;
  name: string;
  location: string;
  sports: string[];
  rating: number;
  distance: number;
  amenities: string[];
  images: string[];
}

interface HomeState {
  nearbyMatches: Match[];
  recommendedFacilities: Facility[];
  recentBookings: any[];
  searchResults: any[];
  isLoading: boolean;
  isSearching: boolean;
  error: string | null;
  searchQuery: string;
  selectedSport: string;
  filters: {
    distance: number;
    priceRange: [number, number];
    timeRange: string;
    playerCount: number;
  };
}

const initialState: HomeState = {
  nearbyMatches: [],
  recommendedFacilities: [],
  recentBookings: [],
  searchResults: [],
  isLoading: false,
  isSearching: false,
  error: null,
  searchQuery: "",
  selectedSport: "all",
  filters: {
    distance: 10,
    priceRange: [0, 100],
    timeRange: "any",
    playerCount: 0,
  },
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setNearbyMatches: (state, action: PayloadAction<Match[]>) => {
      state.nearbyMatches = action.payload;
    },
    setRecommendedFacilities: (state, action: PayloadAction<Facility[]>) => {
      state.recommendedFacilities = action.payload;
    },
    setRecentBookings: (state, action: PayloadAction<any[]>) => {
      state.recentBookings = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.searchResults = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedSport: (state, action: PayloadAction<string>) => {
      state.selectedSport = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<HomeState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
      state.isSearching = false;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setLoading,
  setSearching,
  setNearbyMatches,
  setRecommendedFacilities,
  setRecentBookings,
  setSearchResults,
  setSearchQuery,
  setSelectedSport,
  setFilters,
  setError,
  clearSearchResults,
  resetFilters,
} = homeSlice.actions;

export const homeReducer = homeSlice.reducer; 