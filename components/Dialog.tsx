import React, { Children, ReactNode } from 'react';
import { Button, Dialog as PaperDialog } from 'react-native-paper'
import { Paragraph } from './Paragraph';

type dialogProps = {
  visible: boolean,
  onDismiss?(): void,
  title?: string,
  children?: ReactNode | ReactNode[]
}

export function Dialog(props: dialogProps) {
  const { children, visible, onDismiss, title } = props;
  return (
    <PaperDialog visible={visible} onDismiss={onDismiss}>
      <PaperDialog.Title>{title}</PaperDialog.Title>
      <PaperDialog.Content>
        {children}
      </PaperDialog.Content>
    </PaperDialog>
  )
}
