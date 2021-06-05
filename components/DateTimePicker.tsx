import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePickerCommunity from "@react-native-community/datetimepicker";

type DateTimePickerProps = {
  mode: "date" | "time";
  initialValue: Date;
  setValue: Function;
};

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  mode,
  initialValue,
  setValue,
}) => {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedValue: any) => {
    const currentDate = selectedValue || initialValue;
    setShow(Platform.OS === "ios");
    setValue(currentDate);
  };

  return (
    <View>
      <View>
        <Button onPress={() => setShow(true)} title={`Show ${mode} picker!`} />
      </View>
      {show && (
        <DateTimePickerCommunity
          testID="dateTimePicker"
          value={initialValue}
          mode={mode as any}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
