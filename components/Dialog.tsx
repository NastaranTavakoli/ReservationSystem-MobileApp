import React from 'react';
import { Button, Dialog as PaperDialog } from 'react-native-paper'
import { Paragraph } from './Paragraph';

type dialogProps = {
  visible: boolean,
  onDismiss?(): void,
  title?: string,
  paragraph: string,
  onPress?(): void,
  text?: string,
}

export function Dialog(props: dialogProps) {
  const { visible, onDismiss, title, paragraph, onPress, text } = props;
  return (
    <PaperDialog visible={visible} onDismiss={onDismiss}>
      <PaperDialog.Title>{title}</PaperDialog.Title>
      <PaperDialog.Content>
        <Paragraph>{paragraph}</Paragraph>
        <PaperDialog.Actions>
          <Button onPress={onPress}>{text}</Button>
        </PaperDialog.Actions>
      </PaperDialog.Content>
    </PaperDialog>
  )
}
