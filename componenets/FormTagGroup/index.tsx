import React from "react";
import { useController, useFormContext } from "react-hook-form";

import { View, ViewProps, Text, StyleSheet } from "react-native";
import { Tag } from "../Tag";
import { FormItem } from "../../types/form-item";

export type FormTagGroupProps = ViewProps & {
  isDiamond?: boolean;
  name: string;
  data: FormItem[];
  max?: number;
  min: number;
  flexTags?: boolean;
};

export const FormTagGroup: React.FC<FormTagGroupProps> = ({
  name,
  data,
  max,
  min,
  isDiamond,
  style,
  flexTags,
  ...props
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const handleChange = (item: FormItem) => {
    if (max === 1 && min === 1) {
      if (field.value === item.value) {
        field.onChange();
      } else {
        field.onChange(item.value);
      }
    } else if (field.value) {
      if (field.value.includes(item.value)) {
        field.onChange(field.value.filter((v: string) => v !== item.value));
      } else if (!max || field.value.length < max) {
        field.onChange([...field.value, item.value]);
      }
    } else if (!min || min > 0) {
      field.onChange([item.value]);
    }
  };
  return (
    <View>
      <View style={[styles.tagsContainer, style]} {...props}>
        {data.map((item) => (
          <Tag
            flex={flexTags}
            onPress={() => handleChange(item)}
            key={item.id}
            title={item.name}
            isSelected={
              field.value && max === 1 && min === 1
                ? field.value === item.value
                : field.value?.includes(item.value)
            }
          />
        ))}
      </View>
      <View>
        {fieldState.error?.message && <Text>{fieldState.error?.message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    columnGap: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 12,
  },
});
