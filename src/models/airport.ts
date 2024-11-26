export interface Airport {
  skyId: string;
  entityId: string;
  presentation: Presentation;
  navigation: Navigation;
}

export interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

export interface Navigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
}

export interface RelevantFlightParams {
  skyId: string;
  entityId: string;
  flightPlaceType: string;
  localizedName: string;
}

export interface RelevantHotelParams {
  entityId: string;
  entityType: string;
  localizedName: string;
}


export interface AirportFormattedData {
  label: string
  subtitle: string
  details: AirportFormattedData[]
  skyId: string,
  entityId: string,
  entityType:  string,
}