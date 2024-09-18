import React from "react";
import {
  Pressable,
  ViewStyle,
  Text,
  PressableProps,
  StyleSheet,
} from "react-native";

export type TagProps = PressableProps & {
  style?: ViewStyle;
  title: string;
  flex?: boolean;
  isSelected?: boolean;
};

export const Tag = (props: TagProps) => {
  const { style, title, isSelected, flex, ...other } = props;

  return (
    <Pressable
      style={[
        styles.container,
        flex && { flex: 1 },
        isSelected && { backgroundColor: "#FF7E82" },
        style,
      ]}
      {...other}
    >
      <Text
        style={[
          isSelected && {
            color: "white",
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};
{
  /**
  
const isSelectedStandard = isSelected
  ? colors.bordeaux
  : colors.placeholderSand;
const isSelectedDiamond = isSelected ? colors.softGrey : colors.darkGrey;
const backgroundColor = isDiamond ? isSelectedDiamond : isSelectedStandard;
const borderWidth = !isDiamond && !isSelected ? 1 : 0;
const borderColor = !isDiamond && !isSelected ? colors.darkSand : undefined;
  */
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    //borderColor,
    borderRadius: 8,
    // borderWidth,
    height: 38,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
