import { AirportFormattedData } from "../../models/airport";
import { Itinerary } from "../../models/flight";
import {
  FETCH_AIRPORTS_REQUEST,
  FETCH_AIRPORTS_SUCCESS,
  FETCH_AIRPORTS_FAILURE,
  FETCH_FLIGHTS_REQUEST,
  FETCH_FLIGHTS_SUCCESS,
  FETCH_FLIGHTS_FAILURE,
} from "../actions/flightActions";

interface FlightState {
  flightsList: Itinerary[];
  airportsFromList: AirportFormattedData[];
  airportToList: AirportFormattedData[];
  loading: boolean;
  error: string | null;
  airportError: string | null;
}

const initialState: FlightState = {
  flightsList: [],
  airportsFromList: [],
  airportToList: [],
  loading: false,
  error: null,
  airportError: null
};

const flightReducer = (state = initialState, action: any): FlightState => {
  switch (action.type) {
    // get airports
    case FETCH_AIRPORTS_REQUEST:
      return { ...state, error: null };
    case FETCH_AIRPORTS_SUCCESS: {
      if (action.payload.from) {
        return { ...state, airportsFromList: action.payload.data };
      }
      return { ...state, airportToList: action.payload.data };
    }
    case FETCH_AIRPORTS_FAILURE:
      return { ...state, airportError: action.payload };

    // get flights
    case FETCH_FLIGHTS_REQUEST:
      return { ...state, flightsList: [], loading: true, error: null };
    case FETCH_FLIGHTS_SUCCESS: {
      return { ...state,  loading: false, error: null, flightsList: action.payload };
    }
    case FETCH_FLIGHTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default flightReducer;
