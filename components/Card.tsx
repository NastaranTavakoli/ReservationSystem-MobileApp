import React from 'react';
import { StyleSheet } from 'react-native';
import { Card as PaperCard, Paragraph, Title } from 'react-native-paper';

type CardProps = {
    title: string;
    contentTitle: string;
    paragraph: string;
    uri: string;
}

export function Card(props: CardProps) {
    const { title,  contentTitle, paragraph, uri } = props;
    return (
        <PaperCard>
            <PaperCard.Title title={title} />
            <PaperCard.Content>
                <Title>{contentTitle}</Title>
                <Paragraph>{paragraph}</Paragraph>
            </PaperCard.Content>
            <PaperCard.Cover source={{uri: uri}} />
            <PaperCard.Actions> 
            </PaperCard.Actions>
        </PaperCard>
    )
}

const styles = StyleSheet.create({
    
});
