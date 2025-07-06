import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Court {
  _id: string;
  name: string;
  sport: string;
  capacity: number;
  pricePerHour: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
  courtId: string;
}

interface FacilityDetails {
  _id: string;
  name: string;
  description: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  phone: string;
  email: string;
  website: string;
  rating: number;
  totalReviews: number;
  sports: string[];
  courts: Court[];
  amenities: string[];
  images: string[];
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
  rules: string[];
  policies: string[];
}

interface FacilityState {
  currentFacility: FacilityDetails | null;
  availableSlots: TimeSlot[];
  selectedDate: string;
  selectedCourt: string | null;
  selectedTimeSlot: string | null;
  isLoading: boolean;
  error: string | null;
  bookingData: {
    facilityId: string;
    courtId: string;
    date: string;
    timeSlot: string;
    duration: number;
    price: number;
  } | null;
}

const initialState: FacilityState = {
  currentFacility: null,
  availableSlots: [],
  selectedDate: new Date().toISOString().split('T')[0],
  selectedCourt: null,
  selectedTimeSlot: null,
  isLoading: false,
  error: null,
  bookingData: null,
};

const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCurrentFacility: (state, action: PayloadAction<FacilityDetails>) => {
      state.currentFacility = action.payload;
    },
    setAvailableSlots: (state, action: PayloadAction<TimeSlot[]>) => {
      state.availableSlots = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
      // Reset selections when date changes
      state.selectedCourt = null;
      state.selectedTimeSlot = null;
    },
    setSelectedCourt: (state, action: PayloadAction<string>) => {
      state.selectedCourt = action.payload;
      state.selectedTimeSlot = null; // Reset time slot when court changes
    },
    setSelectedTimeSlot: (state, action: PayloadAction<string>) => {
      state.selectedTimeSlot = action.payload;
    },
    setBookingData: (state, action: PayloadAction<FacilityState["bookingData"]>) => {
      state.bookingData = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearFacilityData: (state) => {
      state.currentFacility = null;
      state.availableSlots = [];
      state.selectedCourt = null;
      state.selectedTimeSlot = null;
      state.bookingData = null;
    },
    resetSelections: (state) => {
      state.selectedCourt = null;
      state.selectedTimeSlot = null;
      state.bookingData = null;
    },
  },
});

export const {
  setLoading,
  setCurrentFacility,
  setAvailableSlots,
  setSelectedDate,
  setSelectedCourt,
  setSelectedTimeSlot,
  setBookingData,
  setError,
  clearFacilityData,
  resetSelections,
} = facilitySlice.actions;

export const facilityReducer = facilitySlice.reducer; 