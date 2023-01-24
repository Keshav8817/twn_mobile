import { Box, FormControl, FormLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type { ElementType, FC, ComponentPropsWithoutRef } from "react";

export interface TextAreaProps extends ComponentPropsWithoutRef<ElementType> {
  formLabelFlex?: string;
  outlinedInputFlex?: string;
}

/**
 * `TextArea` is the textarea field.
 * @param props - HTML attributes.
 */
const ICInput: FC<TextAreaProps> = (props) => {
  let formLabelFlex = props.formLabelFlex ? props.formLabelFlex : "1 1 0";
  let outlinedInputFlex = props.outlinedInputFlex
    ? props.outlinedInputFlex
    : "2 1 0";

  const extraProps: any = {};
  if (props.onChange) {
    extraProps.onChange = props.onChange;
    extraProps.value = props.value;
  }
  return (
    <FormControl
      disabled={props.disabled}
      required={props.required}
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <FormLabel
        htmlFor={props.id}
        sx={{ p: 1, flexBasis: 0, flexGrow: 1, color: "black" }}
      >
        {props.label || props.value}
      </FormLabel>
      <Box
        sx={{
          flex: outlinedInputFlex,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <OutlinedInput
          {...extraProps}
          defaultValue={props.autofill}
          id={props.id}
          inputProps={{
            min: props.minDate,
            max: props.maxDate,
            type: props.type,
          }}
          multiline={true}
          name={props.name}
          type="date"
          size={"small"}
          readOnly={props.readOnly}
          sx={{ borderRadius: 2, flexBasis: 0, flexGrow: 0 }}
        />
      </Box>
    </FormControl>
  );
};

export default ICInput;
