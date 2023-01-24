import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /** Overrides the initial checked state. */
  checked?: boolean;
  /** Associated label. */
  label?: string;
  icon?: any;
  checkedIcon?: any;
  labelPlacement?: any;
  someFunction?: any;
  someFunction2?: any;
}

export type CheckboxProps = Props;

/**
 * `Checkbox` is used on forms.
 * @param props
 */
const Checkbox: FC<Props> = (props) => {
  const [checked, setChecked] = useState<boolean>(props.checked ? true : false);

  useEffect(() => {
    setChecked(props.checked ? true : false);
  }, [props.checked]);

  return (
    <FormControlLabel
      disabled={props.disabled}
      control={
        <MuiCheckbox
          required={props.required}
          checked={checked}
          id={props.id}
          onChange={() => {
            setChecked(!checked);
            if (props.someFunction) {
              props.someFunction(undefined);
            }
            if (props.someFunction2) {
              props.someFunction2(true);
            }
          }}
          value={props.value}
          icon={props?.icon}
          checkedIcon={props?.checkedIcon}
        />
      }
      label={props.label}
      labelPlacement={props.labelPlacement}
    />
  );
};

export default Checkbox;
