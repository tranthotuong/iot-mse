import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../theme';

interface IconProps {
    size?: number;
    color?: string;
    [key: string]: any; // For any additional props
}

interface SettingItem {
    name: string;
    icon: React.FC<IconProps>;
}

const settings: { [key: string]: SettingItem } = {
    'light': {
        name: 'Light',
        icon: ({ size, color, ...props }: IconProps) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.sizes.font}
                color={color || theme.colors.colors.accent}
                name="lightbulb-on-outline"
                {...props}
            />
        ),
    },
    'pump': {
        name: 'Pump',
        icon: ({ size, color, ...props }: IconProps) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.sizes.font}
                color={color || theme.colors.colors.accent}
                name="water-pump"
                {...props}
            />
        ),
    },
    'temperature': {
        name: 'Temperature',
        icon: ({ size, color, ...props }: IconProps) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.sizes.font}
                color={color || theme.colors.colors.accent}
                name="coolant-temperature"
                {...props}
            />
        ),
    },
    'fan': {
        name: 'Fan',
        icon: ({ size, color, ...props }: IconProps) => (
            <MaterialCommunityIcons
                size={size || theme.sizes.sizes.font}
                color={color || theme.colors.colors.accent}
                name="fan"
                {...props}
            />
        ),
    },
    'wi-fi': {
        name: 'Wi-Fi',
        icon: ({ size, color, ...props }: IconProps) => (
            <FontAwesome
                size={size || theme.sizes.sizes.font}
                color={color || theme.colors.colors.accent}
                name="wifi"
                {...props}
            />
        ),
    },
    'electricity': {
        name: 'Electricity',
        icon: ({ size, color, ...props }: IconProps) => (
            <MaterialIcons
                size={size || theme.sizes.sizes.font}
                color={color || theme.colors.colors.accent}
                name="power"
                {...props}
            />
        ),
    },
    'humidity': {
        name: 'Humidity',
        icon: ({ size, color, ...props }: IconProps) => (
            <MaterialIcons
                size={size || theme.sizes.sizes.font}
                color={color || theme.colors.colors.accent}
                name="water-drop"
                {...props}
            />
        ),
    },
};

export default settings;