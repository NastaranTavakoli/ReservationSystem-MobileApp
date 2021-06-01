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
  onChangeText?: (((text: string) => void) & Function) | undefined;
  onBlur?:
    | (((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) &
        ((args: any) => void))
    | undefined;
};

export function TextInput({
  mode = "flat",
  disabled = false,
  label,
  placeholder,
  multiline,
  value,
  onBlur,
  onChangeText,
}: TextInputProps) {
  return (
    <PaperTextInput
      mode={mode}
      disabled={disabled}
      label={label}
      placeholder={placeholder}
      multiline={multiline}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
    />
  );
}
