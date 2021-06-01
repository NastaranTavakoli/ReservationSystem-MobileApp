import React, { ReactNode } from 'react';
import { HelperText as PaperHelperText } from 'react-native-paper';

type HelperTextProps = {
    children: ReactNode;
    visible?: boolean;
    type?: 'error' | 'info';
}

export function Title({ children, visible = true, type = 'info' }: HelperTextProps) {
    return (
        <PaperHelperText visible={visible} type={type}>{children}</PaperHelperText>
    )
}