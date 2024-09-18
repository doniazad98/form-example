import React, { forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";

import { TextInputProps, TextInputRefProps, TextInput } from "../TextInput";

export type FormTextInputProps = TextInputProps & {
  name: string;
  trimText?: boolean;
};

export const FormTextInput = forwardRef<TextInputRefProps, FormTextInputProps>(
  ({ name, trimText, ...props }, ref) => {
    const { control } = useFormContext();
    const { field, fieldState } = useController({
      control,
      name,
    });

    const handleChange = (text: string) => {
      if (trimText) {
        const trimmedText = text.trim();
        field.onChange(trimmedText);
      } else {
        field.onChange(text);
      }
    };

    return (
      <TextInput
        ref={ref}
        onChangeText={handleChange}
        value={field?.value}
        error={fieldState.error?.message}
        {...props}
      />
    );
  }
);
