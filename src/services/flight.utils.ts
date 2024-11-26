import { Airport, AirportFormattedData } from '../models/airport';
import { Itinerary, Leg, Segment } from '../models/flight';

export function formatData(input: Airport[]): (AirportFormattedData | undefined)[] {
    // Create a map to store root entities by their entityId
    const rootEntities: Map<string, AirportFormattedData> = new Map();
  
    // First, populate root entities
    input.forEach((item) => {
      const { entityId, presentation, skyId, navigation } = item;
      rootEntities.set(entityId, {
        skyId,
        entityId,
        entityType: navigation.entityType,
        label: presentation.suggestionTitle,
        subtitle: presentation.subtitle,
        details: [],
      });
    });
  
    // Then, populate the details and remove objects from the root if added to details
    const filteredRootEntities = input.filter((item) => {
      const relevantHotelId = item.navigation.relevantHotelParams.entityId;
  
      // Check if this item should be added to another root entity's details
      if (
        rootEntities.get(relevantHotelId) &&
        relevantHotelId !== item.entityId
      ) {
        rootEntities.get(relevantHotelId)?.details.push({
          skyId: item.skyId,
          entityId: item.entityId,
          entityType: item.navigation.entityType,
          label: item.presentation.suggestionTitle,
          subtitle: item.presentation.subtitle,
          details: [],
        });
        return false; // Remove this item from root since it's added to details
      }
  
      return true; // Keep this item as a root entity
    });
  
    // Convert remaining root entities to array format
    return filteredRootEntities
      .map((item) => rootEntities.get(item.entityId))
      .filter((f) => f);
  }
  
  export function formatFlightList(value: Itinerary[]) {
    return value.map((flight) => {
      const totalDurationInMinutes = flight.legs.reduce(
        (total: number, leg: Leg) => total + leg.durationInMinutes,
        0
      );
      const totalDuration = `${Math.floor(totalDurationInMinutes / 60)} hr ${
        totalDurationInMinutes % 60
      } min`;
  
      return {
        ...flight,
        carriers: Array.from(
          new Set(
            flight.legs.flatMap((leg: Leg) =>
              leg.carriers.marketing.map((c) => c.name)
            )
          )
        ).join(", "),
        totalDurationFormatted: totalDuration,
        stopCount: `${flight.legs.reduce(
          (prev: number, leg: Leg) => prev + leg.stopCount,
          0
        )} stops`,
        route: `${flight.legs[0].origin.displayCode}–${flight.legs[0].destination.displayCode}, ${flight.legs[1].origin.displayCode}–${flight.legs[1].destination.displayCode}`,
        departureTime: new Date(flight.legs[0].departure).toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        arrivalTime: new Date(
          flight.legs[flight.legs.length - 1].arrival
        ).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        legs: flight.legs.map((leg: Leg) => ({
          ...leg,
          layover: leg.stopCount > 0 ? calculateLayover(leg.segments) : null,
          formattedDuration: `${Math.floor(
            leg.durationInMinutes / 60
          )} hr ${Math.floor(leg.durationInMinutes % 60)} min`,
          departureTime: new Date(leg.departure).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          arrivalTime: new Date(leg.arrival).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          segments: leg.segments.map((segment: Segment) => ({
            ...segment,
            amenities: [
              "Average legroom (30 in)",
              "In-seat USB outlet",
              "On-demand video",
            ],
            durationFormatted: `${Math.floor(
              segment.durationInMinutes / 60
            )} hr ${Math.floor(segment.durationInMinutes % 60)} min`,
            departureTime: new Date(segment.departure).toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            ),
            arrivalTime: new Date(segment.arrival).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          })),
          amenities: [
            "Average legroom (30 in)",
            "In-seat USB outlet",
            "On-demand video",
          ],
        })),
      };
    });
  }
  
  export const calculateLayover = (segments: Segment[]) => {
    const layovers = [];
    for (let i = 0; i < segments.length - 1; i++) {
      const arrivalTime = new Date(segments[i].arrival);
      const departureTime = new Date(segments[i + 1].departure);
      const layoverDuration = Math.floor(
        (departureTime.getTime() - arrivalTime.getTime()) / (1000 * 60)
      );
      layovers.push({
        location: segments[i].destination.name,
        duration: `${Math.floor(layoverDuration / 60)} hr ${
          layoverDuration % 60
        } min`,
        overnight: layoverDuration > 480, // Example logic for marking overnight layovers
      });
    }
    return layovers;
  };