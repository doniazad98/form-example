import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  KeyboardTypeOptions,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  TextStyle,
  View,
  ViewStyle,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export type TextInputProps = NativeTextInputProps & {
  onBlur?: (_: unknown) => void;
  onFocus?: (_: unknown) => void;
  value?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  disabled?: boolean;
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  caption?: string;
  leftIconColor?: string;
  rightIconColor?: string;
  onLeftIconPressed?: () => void;
  onRightIconPressed?: () => void;
  isDiamond?: boolean;
};

export type TextInputRefProps = {
  blur: () => void;
  focus: () => void;
};

export const TextInput = forwardRef<TextInputRefProps, TextInputProps>(
  (props: TextInputProps, ref) => {
    const {
      style,
      inputStyle,
      title,
      disabled,
      value,
      onChangeText,
      onFocus,
      onBlur,
      error,
      leftIconColor,
      rightIconColor,
      onRightIconPressed,
      onLeftIconPressed,
      inputContainerStyle,
      isDiamond,
      subtitle,
      ...other
    } = props;

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const inputRef = useRef<
      React.ComponentRef<typeof NativeTextInput> & { focus: () => void }
    >(null);

    const blur = useCallback(() => {
      inputRef?.current?.blur();
    }, []);

    const focus = useCallback(() => {
      inputRef?.current?.focus();
    }, []);

    useImperativeHandle(ref, () => ({ blur, focus }), [blur, focus]);

    const onFocusCb = useCallback(
      (_: unknown) => {
        onFocus?.(_);
        setIsFocused(true);
        inputRef.current?.focus();
      },
      [onFocus]
    );

    const onBlurCb = useCallback(
      (_: unknown) => {
        onBlur?.(_);
        setIsFocused(false);
      },
      [onBlur]
    );

    return (
      <View style={style}>
        {!!title && <Text>{title}</Text>}

        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <View style={styles.textInputContainer}>
          <View style={[styles.innerTextInputContainer, inputContainerStyle]}>
            <NativeTextInput
              ref={inputRef}
              value={value}
              style={[styles.textInput, inputStyle]}
              onChangeText={onChangeText}
              onBlur={onBlurCb}
              onFocus={onFocusCb}
              //cursorColor={}
              // placeholderTextColor={  }
              autoCorrect={false}
              editable={!disabled}
              {...other}
            />
          </View>
        </View>
        <View>{error && <Text>{error}</Text>}</View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  innerTextInputContainer: {
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    columnGap: 12,
    flexDirection: "row",
    paddingVertical: 12,
  },
  subtitle: {
    marginTop: 4,
  },
  textInput: {
    // ...typographyStyles.body,
    //color,
    flex: 1,
    flexGrow: 1,
    lineHeight: undefined,
  },
  textInputContainer: {
    marginTop: 4,
    rowGap: 6,
  },
});
