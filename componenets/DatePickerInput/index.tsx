import moment from "moment";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  View,
  ViewProps,
  ViewStyle,
  Text,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type DateFormats = "MM/DD/YYYY";
export const formatDate = (date: Date, format: DateFormats) => {
  return moment(date).format(format);
};
export type DatePickerInputProps = ViewProps & {
  style?: ViewStyle;
  isDiamond?: boolean;
  placeholder?: string;
  onChange?: (date: Date) => void;
  value?: Date;
  title?: string;
  error?: string;
  onPress?: () => void;
};

export const DatePickerInput = (props: DatePickerInputProps) => {
  const {
    style,
    error,
    isDiamond,
    title,
    placeholder,
    onChange,
    value,
    onPress,
    ...other
  } = props;
  const [show, setShow] = useState(false);

  const hideDatePicker = useCallback(() => {
    setShow(false);
  }, []);

  const handlePress = useCallback(
    (item: Date) => {
      hideDatePicker();
      if (onChange) {
        onChange(item);
      }
    },
    [hideDatePicker, onChange]
  );

  const openDatePicker = () => {
    setShow(true);
    if (onPress) {
      onPress();
    }
  };

  const minimumAgeDate = moment().subtract(18, "years").toDate();

  return (
    <View style={[styles.container, style]}>
      {!!title && <Text>{title}</Text>}

      <Pressable
        style={styles.inputContainer}
        onPress={openDatePicker}
        {...other}
      >
        <Text>
          {value
            ? formatDate(value, "MM/DD/YYYY")
            : placeholder || "Select a date"}
        </Text>
        <DateTimePickerModal
          date={value ?? new Date()}
          isVisible={show}
          mode="date"
          onConfirm={handlePress}
          onCancel={hideDatePicker}
          locale="en-US"
          maximumDate={minimumAgeDate}
        />
      </Pressable>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  error: {
    marginTop: 4,
  },
  inputContainer: {
    borderBottomWidth: 1,
    height: 48,
    justifyContent: "center",
    marginTop: 4,
  },
});
