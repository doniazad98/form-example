import React, { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";

import { DropDown, DropDownProps } from "../DropDown";

export type FormDropDownProps = Omit<DropDownProps, "onChange"> & {
  name: string;
};

export const FormDropDown: React.FC<FormDropDownProps> = ({
  name,
  ...props
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const handleChange = useCallback(
    (value: string) => {
      field.onChange(value);
    },
    [field]
  );

  return (
    <DropDown
      value={field?.value}
      error={fieldState.error?.message}
      onChange={handleChange}
      {...props}
    />
  );
};
