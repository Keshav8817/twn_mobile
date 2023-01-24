import React, {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, FormLabel } from "@mui/material";
export interface ICDropdownPropsType
  extends ComponentPropsWithoutRef<ElementType> {
  optionsList: any[];
}

function getStyles(name: string, personName1: string[], theme: Theme) {
  return {
    display: "block",
    width: "300px",
    fontWeight:
      personName1.indexOf(name) === -1
        ? theme.palette.background.paper
        : theme.typography.fontWeightMedium,
  };
}

const ICMultiSelectDropdown = (props: ICDropdownPropsType): ReactElement => {
  const theme = useTheme();
  return (
    <div>
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: "0 1rem",
          background: "#aw21ef",
          marginRight: "50px",
        }}
      >
        <Box sx={{ flexBasis: 0, flexGrow: 1 }}>
          <FormLabel htmlFor={props.id} sx={{ color: "black" }}>
            {props.label}
          </FormLabel>
        </Box>
        <Box
          sx={{
            flexBasis: 0,
            borderRadius: 0,
            flexGrow: 5,
          }}
        >
          <FormControl
            sx={{
              m: 1,
              width: 300,
              mt: 3,
              paddingLeft: 2.5,
            }}
          >
            <Select
              readOnly={props.readOnly}
              id={props.id}
              name={props.id}
              multiple
              displayEmpty
              value={props.value}
              onChange={props.onChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 1) {
                  return selected.join("");
                }
                return selected.join(", ");
              }}
              sx={{
                height: "40px",
                backgroundColor: "#dfdada",
                borderRadius: 0,
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    height: "250px",
                    position: "relative",
                    width: "2px",
                  },
                },
              }}
            >
              <MenuItem disabled></MenuItem>
              {props.optionsList.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, props.value, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  );
};
export default ICMultiSelectDropdown;
