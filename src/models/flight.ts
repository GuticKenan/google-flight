

export interface SearchFlightParams {
  originSkyId?: string;
  destinationSkyId?: string;
  originEntityId?: string;
  destinationEntityId?: string;
  date: string | Date;
  returnDate: string | Date;
  cabinClass?: string;
  adults?: string;
  sortBy?: string;
  countryCode?: string;
  flightType?: string;
}

export interface FlightListResponse {
    itineraries: Itinerary[]
    flightsSessionId: string
    destinationImageUrl: string
  }
  export interface Itinerary {
    id: string;
    price: Price;
    legs: Leg[];
    isSelfTransfer: boolean;
    isProtectedSelfTransfer: boolean;
    farePolicy: FarePolicy;
    eco?: Eco;
    tags: string[];
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
    arrivalTime: string;
    departureTime: string;
    carriers: string;
    totalDurationFormatted: string;
    route: string;
    stopCount: string
  }
  
  export interface Price {
    raw: number;
    formatted: string;
  }
  
  export interface Leg {
    id: string;
    origin: Origin;
    destination: Destination;
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: Carriers;
    segments: Segment[];
    layover: {
      location: string;
      duration: string;
      overnight: boolean;
    }[];
  }
  
  export interface Origin {
    id: string;
    name: string;
    displayCode: string;
    city: string;
    isHighlighted: boolean;
    entityId: string;
    country: string;
  }
  
  export interface Destination {
    id: string;
    name: string;
    displayCode: string;
    city: string;
    isHighlighted: boolean;
    entityId: string;
    country: string;
  }
  
  export interface Carriers {
    marketing: Marketing[];
    operationType: string;
  }
  
  export interface Marketing {
    id: number;
    logoUrl: string;
    name: string;
  }
  
  export interface Segment {
    id: string;
    origin: Origin2;
    destination: Destination2;
    departure: string;
    arrival: string;
    durationInMinutes: number;
    flightNumber: string;
    marketingCarrier: MarketingCarrier;
    operatingCarrier: OperatingCarrier;
    departureTime: string;
    durationFormatted: string;
    arrivalTime: string;
    amenities: string[];
  }
  
  export interface Origin2 {
    flightPlaceId: string;
    displayCode: string;
    parent: Parent;
    name: string;
    type: string;
  }
  
  export interface Parent {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
  }
  
  export interface Destination2 {
    flightPlaceId: string;
    displayCode: string;
    parent: Parent2;
    name: string;
    type: string;
  }
  
  export interface Parent2 {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
  }
  
  export interface MarketingCarrier {
    id: number;
    name: string;
    alternateId: string;
    allianceId: number;
  }
  
  export interface OperatingCarrier {
    id: number;
    name: string;
    alternateId: string;
    allianceId: number;
  }
  
  export interface FarePolicy {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  }
  
  export interface Eco {
    ecoContenderDelta: number;
  }
  