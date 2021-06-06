import React from "react";
import { Searchbar as PaperSearchbar } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type SearchBarProps = {
  placeholder?: string;
  onChange: (text: string) => void;
  value: string;
  icon: IconSource;
};

export const SearchBar = ({
  placeholder = "Search",
  onChange,
  icon,
  value,
}: SearchBarProps) => {
  return (
    <PaperSearchbar
      placeholder={placeholder}
      onChangeText={onChange}
      value={value}
      icon={icon}
    />
  );
};

