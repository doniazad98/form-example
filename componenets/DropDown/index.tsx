import React from "react";
import { View, ViewStyle, Text, ViewProps, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export type DropDownProps = ViewProps & {
  style?: ViewStyle;
  isDiamond?: boolean;
  data: Array<{ label: string; value: string }>;
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string;
  title?: string;
  error?: string;
};

export const DropDown = (props: DropDownProps) => {
  const {
    style,
    value,
    error,
    title,
    isDiamond,
    data,
    placeholder,
    onChange,
    ...other
  } = props;

  return (
    <View style={[styles.container, style]} {...other}>
      {!!title && <Text>{title}</Text>}
      <Dropdown
        value={value}
        labelField="label"
        valueField="value"
        data={data}
        style={styles.dropdown}
        placeholder={placeholder}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedItem}
        containerStyle={
          {
            // backgroundColor: isDiamond ? colors.light : colors.darkSand,
          }
        }
        // iconColor={isDiamond ? colors.softWhite : colors.darkGrey}
        onChange={(item) => onChange(item.value)}
      />
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
  dropdown: {
    alignSelf: "stretch",
    borderBottomWidth: 1,
    // borderColor: colors.tertiaryGrey,
    height: 52,
    marginTop: 14,
  },
  placeholder: {
    //...typographyStyles.body,
    //  color: colors.tertiaryGrey,
  },
  selectedItem: {
    //...typographyStyles.body,
    // color: options?.isDiamond ? colors.softWhite : colors.darkGrey,
  },
});
