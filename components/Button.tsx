import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function Button({ onPress, title }: { onPress: () => void; title: string }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View>
                <Text>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}