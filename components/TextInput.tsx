import React, { ReactNode } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";

type TextInputProps = {
  mode?: 'flat' | 'outlined' | undefined;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  value?: string;
  editable?: boolean;
  onChangeText?: (((text: string) => void) & Function) | undefined;
  onBlur?:
    | (((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) &
        ((args: any) => void))
    | undefined;
  secureTextEntry?: boolean;
};

export function TextInput({
  mode = "flat",
  disabled = false,
  ...props
}: TextInputProps) {
  return (
    <PaperTextInput
      mode={mode}
      disabled={disabled}
      {...props}
    />
  );
}
