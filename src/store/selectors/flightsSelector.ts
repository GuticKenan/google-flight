import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectState = (state: RootState) => state;

export const selectAirportFromList = createSelector(
  [selectState],
  (state) => state.flights.airportsFromList
);

export const selectAirportToList = createSelector(
  [selectState],
  (state) => state.flights.airportToList
);

export const selectFlightList = createSelector(
  [selectState],
  (state) => state.flights.flightsList
);

export const selectLoading = createSelector(
  [selectState],
  (state) => state.flights.loading
);

export const selectError = createSelector(
  [selectState],
  (state) => state.flights.error
);

