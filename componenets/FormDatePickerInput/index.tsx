import React, { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";

import { DatePickerInput, DatePickerInputProps } from "../DatePickerInput";

export type FormDatePickerInputProps = Omit<
  DatePickerInputProps,
  "onChange"
> & {
  name: string;
  onPress?: () => void;
};

export const FormDatePickerInput: React.FC<FormDatePickerInputProps> = ({
  name,
  onPress,
  ...props
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const handleChange = useCallback(
    (date: Date) => {
      field.onChange(date);
    },
    [field]
  );

  return (
    <DatePickerInput
      onPress={onPress}
      onChange={handleChange}
      value={field?.value}
      error={fieldState.error?.message}
      {...props}
    />
  );
};
