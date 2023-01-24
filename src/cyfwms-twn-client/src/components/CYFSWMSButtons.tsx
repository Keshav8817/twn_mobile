import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import React from "react";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from "react";

/**
 * The CYFSWMSAddButton functional component.
 * @returns CYFSWMSAddButton component skeleton.
 */
export const CYFSWMSAddButton = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  return (
    <Button onClick={props.onClick} startIcon={<AddIcon />} variant="contained">
      Add More
    </Button>
  );
};

/**
 * The CYFSWMSNextButton functional component.
 * @returns CYFSWMSNextButton component skeleton.
 */
export const CYFSWMSNextButton = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  return (
    <Button type="submit" variant="contained" {...props}>
      Save
    </Button>
  );
};

/**
 * The CYFSWMSSaveButton functional component.
 * @returns CYFSWMSSaveButton component skeleton.
 */
export const CYFSWMSSaveButton = (): ReactElement => {
  return (
    <Button startIcon={<SaveIcon />} type="submit" variant="contained">
      Save
    </Button>
  );
};

export const CYFSWMSViewButton = (
  props: ComponentPropsWithoutRef<ElementType>
): ReactElement => {
  return (
    <Button type="submit" variant="contained" {...props}>
      View
    </Button>
  );
};
