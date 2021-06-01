import React, { ReactNode } from 'react';
import { Subheading as PaperSubheading } from 'react-native-paper';

type SubheadingProps = {
    children: ReactNode
}

export function Title({ children }: SubheadingProps) {
    return (
        <PaperSubheading>{children}</PaperSubheading>
    )
}