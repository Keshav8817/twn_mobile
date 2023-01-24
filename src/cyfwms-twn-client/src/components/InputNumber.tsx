import { FormControl, FormLabel, OutlinedInput } from "@mui/material";
import {
  ElementType,
  FC,
  ComponentPropsWithoutRef,
  useState,
  useEffect,
} from "react";

interface Props extends ComponentPropsWithoutRef<ElementType> {
  /* Customizes width of label and input */
  formLabelFlex?: string;
  outlinedInputFlex?: string;
}

/**
 * `InputNumberProps` is an alias type for `Props` data type used by
 * `InputNumber` FC.
 */
export type InputNumberProps = Props;

/**
 * `InputNumber` FC is used on forms for number fields.
 * @param props
 * @returns Input component skeleton.
 */
const InputNumber: FC<Props> = (props) => {
  const [val, setVal] = useState(props.autofill);
  useEffect(() => {
    setVal(props.autofill);
  }, [props.autofill]);

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
        sx={{ p: 1, flex: props.formLabelFlex || "1 1 0", color: "black" }}
      >
        {props.value}
      </FormLabel>
      <OutlinedInput
        value={val}
        onChange={(event) => {
          setVal(event.currentTarget.value);
        }}
        id={props.id}
        name={props.name}
        inputProps={{
          min: props.min,
          max: props.max,
          sx: { p: 1 },
        }}
        type="number"
        sx={{
          backgroundColor: "#dfdada",
          borderRadius: 0,
          flex: props.outlinedInputFlex || "2 1 0",
        }}
        readOnly={props.readOnly}
      />
    </FormControl>
  );
};

export default InputNumber;
