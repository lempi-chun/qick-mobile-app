import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingPlayer {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  skills: any;
}

interface Booking {
  _id: string;
  facility: {
    _id: string;
    name: string;
    location: string;
  };
  court: {
    _id: string;
    name: string;
    sport: string;
  };
  date: string;
  timeSlot: string;
  duration: number;
  price: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  players: BookingPlayer[];
  maxPlayers: number;
  createdBy: string;
  bookingType: "individual" | "team" | "recurring" | "open_play";
  paymentStatus: "pending" | "paid" | "refunded" | "failed";
  paymentMethod: string;
  isRecurring: boolean;
  recurringDays?: string[];
  recurringEndDate?: string;
  invitations: string[];
  waiverRequired: boolean;
  waiverSigned: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingState {
  currentBooking: Booking | null;
  bookingHistory: Booking[];
  upcomingBookings: Booking[];
  pendingInvitations: Booking[];
  isLoading: boolean;
  isCreating: boolean;
  isPaymentProcessing: boolean;
  error: string | null;
  bookingFlow: {
    step: number;
    facilityId: string;
    courtId: string;
    date: string;
    timeSlot: string;
    duration: number;
    price: number;
    players: BookingPlayer[];
    maxPlayers: number;
    bookingType: "individual" | "team" | "recurring" | "open_play";
    isRecurring: boolean;
    recurringDays: string[];
    recurringEndDate: string;
    invitedPlayers: string[];
    paymentMethod: string;
    notes: string;
  };
}

const initialState: BookingState = {
  currentBooking: null,
  bookingHistory: [],
  upcomingBookings: [],
  pendingInvitations: [],
  isLoading: false,
  isCreating: false,
  isPaymentProcessing: false,
  error: null,
  bookingFlow: {
    step: 1,
    facilityId: "",
    courtId: "",
    date: "",
    timeSlot: "",
    duration: 1,
    price: 0,
    players: [],
    maxPlayers: 0,
    bookingType: "individual",
    isRecurring: false,
    recurringDays: [],
    recurringEndDate: "",
    invitedPlayers: [],
    paymentMethod: "",
    notes: "",
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
    },
    setPaymentProcessing: (state, action: PayloadAction<boolean>) => {
      state.isPaymentProcessing = action.payload;
    },
    setCurrentBooking: (state, action: PayloadAction<Booking>) => {
      state.currentBooking = action.payload;
    },
    setBookingHistory: (state, action: PayloadAction<Booking[]>) => {
      state.bookingHistory = action.payload;
    },
    setUpcomingBookings: (state, action: PayloadAction<Booking[]>) => {
      state.upcomingBookings = action.payload;
    },
    setPendingInvitations: (state, action: PayloadAction<Booking[]>) => {
      state.pendingInvitations = action.payload;
    },
    updateBookingFlow: (state, action: PayloadAction<Partial<BookingState["bookingFlow"]>>) => {
      state.bookingFlow = { ...state.bookingFlow, ...action.payload };
    },
    nextBookingStep: (state) => {
      state.bookingFlow.step += 1;
    },
    previousBookingStep: (state) => {
      state.bookingFlow.step = Math.max(1, state.bookingFlow.step - 1);
    },
    setBookingStep: (state, action: PayloadAction<number>) => {
      state.bookingFlow.step = action.payload;
    },
    addPlayerToBooking: (state, action: PayloadAction<BookingPlayer>) => {
      state.bookingFlow.players.push(action.payload);
    },
    removePlayerFromBooking: (state, action: PayloadAction<string>) => {
      state.bookingFlow.players = state.bookingFlow.players.filter(
        player => player._id !== action.payload
      );
    },
    updateBookingStatus: (state, action: PayloadAction<{ bookingId: string; status: Booking["status"] }>) => {
      const { bookingId, status } = action.payload;
      
      // Update in upcoming bookings
      const upcomingIndex = state.upcomingBookings.findIndex(b => b._id === bookingId);
      if (upcomingIndex !== -1) {
        state.upcomingBookings[upcomingIndex].status = status;
      }
      
      // Update in booking history
      const historyIndex = state.bookingHistory.findIndex(b => b._id === bookingId);
      if (historyIndex !== -1) {
        state.bookingHistory[historyIndex].status = status;
      }
      
      // Update current booking if it matches
      if (state.currentBooking?._id === bookingId) {
        state.currentBooking.status = status;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearBookingFlow: (state) => {
      state.bookingFlow = initialState.bookingFlow;
    },
    resetBookingState: (state) => {
      state.currentBooking = null;
      state.bookingFlow = initialState.bookingFlow;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setCreating,
  setPaymentProcessing,
  setCurrentBooking,
  setBookingHistory,
  setUpcomingBookings,
  setPendingInvitations,
  updateBookingFlow,
  nextBookingStep,
  previousBookingStep,
  setBookingStep,
  addPlayerToBooking,
  removePlayerFromBooking,
  updateBookingStatus,
  setError,
  clearBookingFlow,
  resetBookingState,
} = bookingSlice.actions;

export const bookingFieldReducer = bookingSlice.reducer; 