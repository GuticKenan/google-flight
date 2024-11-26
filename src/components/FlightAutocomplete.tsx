import React, { useCallback, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AirportFormattedData } from "../models/airport";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlightIcon from "@mui/icons-material/Flight";

type FlightAutocompleteProps = {
  options: AirportFormattedData[];
  selectedOption: AirportFormattedData | null;
  from?: boolean;
  fetchValue: (value: string, from?: boolean) => void;
  setSelectedOption: (value: AirportFormattedData) => void;
};

export const FlightAutocomplete: React.FC<FlightAutocompleteProps> = ({
  options,
  selectedOption,
  fetchValue,
  from = false,
  setSelectedOption,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedAirport, setSelectedAirport] =
    useState<AirportFormattedData | null>(selectedOption);

  const handleInputValueChanged = useCallback(
    (newInputValue: string, reason: string) => {
      if (reason === "input") {
        fetchValue(newInputValue, from);
      }
    },
    [fetchValue, from]
  );

  const handleSelectOption = useCallback(
    (newValue: AirportFormattedData) => {
      setSelectedAirport(newValue);
      setSelectedOption(newValue);
      setOpen(false);
    },
    [setSelectedOption]
  );

  return (
    <Autocomplete
      sx={{
        paddingBottom: 0,
        flex: 1,
        width: "100%",
      }}
      open={open}
      value={selectedAirport}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      onInputChange={(event, newInputValue, reason) =>
        handleInputValueChanged(newInputValue, reason)
      }
      isOptionEqualToValue={(option, value) => option.label === value.label}
      getOptionLabel={(option) => (option ? option.label : "Where from")}
      options={options}
      renderOption={(props, option: AirportFormattedData) => (
        <Accordion
          sx={{
            width: "100%",
            padding: 0,
            "&.Mui-expanded": {
              margin: 0,
            },
          }}
        >
          <AccordionSummary
            expandIcon={option.details.length ? <ExpandMoreIcon /> : null}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => {
              if (option.details.length > 0) return;
              handleSelectOption(option);
            }}
          >
            <LocationOnIcon />
            <Typography variant="body2" color="gray">
              {option.label}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {option.details.map(
                (detail: AirportFormattedData, index: number) => (
                  <ListItem
                    sx={{
                      cursor: "pointer",
                    }}
                    key={detail.entityId + index}
                    onClick={() => handleSelectOption(detail)}
                  >
                    <ListItemIcon>
                      <FlightIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={detail.label}
                      secondary={`${detail.subtitle}`}
                    />
                  </ListItem>
                )
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Where from"
          slotProps={{
            input: {
              ...params.InputProps,
            },
          }}
        />
      )}
    />
  );
};

export default FlightAutocomplete;
