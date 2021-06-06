import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

type PickerViewProps = {
  options: string[];
  setValue: Function;
};

export const PickerView: React.FC<PickerViewProps> = ({
  options,
  setValue,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
    >
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
      <Picker.Item label="JavaScript" value="js" />
      <Picker.Item label="JavaScript" value="js" />
      <Picker.Item label="JavaScript" value="js" />
      <Picker.Item label="JavaScript" value="js" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
};
