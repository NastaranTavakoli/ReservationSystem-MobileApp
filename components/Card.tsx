import React from "react";
import { StyleSheet } from "react-native";
import {
  Card as PaperCard,
  Paragraph,
  Title,
  Button,
} from "react-native-paper";

type CardProps = {
  title: string;
  contentTitle: string;
  paragraph: string;
  uri: string;
  onPress: () => void;
  btnTitle: string;
};

export function Card(props: CardProps) {
  const { title, contentTitle, paragraph, uri, onPress, btnTitle } = props;
  return (
    <PaperCard onPress={onPress}>
      <PaperCard.Title title={title} />
      <PaperCard.Content>
        <Title>{contentTitle}</Title>
        <Paragraph>{paragraph}</Paragraph>
      </PaperCard.Content>
      <PaperCard.Cover source={{ uri: uri }} />
      <PaperCard.Actions>
        <Button onPress={onPress}>{btnTitle}</Button>
      </PaperCard.Actions>
    </PaperCard>
  );
}

const styles = StyleSheet.create({});
