import React, { useState } from 'react'
import { StyleSheet, Dimensions, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/SmartClimate';
import { LineChart, YAxis, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape'

import * as theme from '../constants/theme';
import { Block, Text, PanSlider } from '../components';
import mocks from '../constants/settings';
import { useAppSelector } from '../hooks'

const { height } = Dimensions.get('window');
const CONTROLLER_HEIGHT = height * 0.25;

// Assuming mocks is typed elsewhere, if not, define the type here
interface Settings {
    [key: string]: {
        name: string;
        icon: React.ElementType; // Adjust if needed
    };
}

type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const Settings: React.FC<SettingsProps> = ({ navigation, route }) => {
    const hum = useAppSelector((state) => state.humidity.val);
    const temp = useAppSelector((state) => state.temperature.val);
    const humArray = useAppSelector((state) => state.humidity.vals);
    const tempArray = useAppSelector((state) => state.temperature.vals);
    // Assuming settings is typed correctly in your project
    const settings: Settings = mocks;
    const { name } = route.params;
    const Icon = settings[name].icon;
    const caption = settings[name].name;
    // render switch
    function renderSwitch(param: string): React.ReactNode {
        switch (param) {
            case 'temperature':
                return <Block flex={1.2} row style={{ alignItems: 'flex-end', }}>
                    <Text h1>{temp}</Text>
                    <Text h1 size={34} height={80} weight={'600'} spacing={0.1}>°C</Text>
                </Block>;
            case 'humidity':
                return <Block flex={1.2} row style={{ alignItems: 'flex-start', }}>
                    <Text h1>{hum}</Text>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../../assets/humidity.png')}
                    />
                </Block>;
            default:
                return;
        }
    }

    function renderDataGrid(param: string): Array<number>{
        switch (param) {
            case 'temperature':
                return tempArray;
            case 'humidity':
                return humArray;
            default:
                return [];
        }
    }

    function renderTypeGrid(param: string): string{
        switch (param) {
            case 'temperature':
                return 'ºC';
            case 'humidity':
                return '%';
            default:
                return '';
        }
    }
    // Component tsx
    return (
        <Block flex={1} style={styles.settings}>
            <Block flex={0.5} row>
                <Block flex={1}>
                    <Icon size={theme.sizes.sizes.font * 4} color={theme.colors.colors.gray2} />
                    {renderSwitch(name)}
                    <Text caption>{caption}</Text>
                </Block>
            </Block>
            <Block flex={1} style={{ paddingTop: theme.sizes.sizes.base * 2 }}>
                <Block row style={{ height: 200 }}>
                    <YAxis
                        data={[ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]}
                        contentInset={{ top: 20, bottom: 20 }}
                        svg={{
                            fill: 'grey',
                            fontSize: 10,
                        }}
                        numberOfTicks={10}
                        formatLabel={(value) => `${value}${renderTypeGrid(name)}`}
                    />
                    <LineChart
                        style={{ flex: 1, marginLeft: 16 }}
                        data={renderDataGrid(name)}
                        curve={shape.curveNatural}
                        svg={{ stroke: theme.colors.colors.accent, strokeWidth: 3 }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid />
                    </LineChart>
                </Block>
            </Block>
        </Block>
    )
}

export default Settings;

const styles = StyleSheet.create({
    settings: {
        padding: theme.sizes.sizes.base * 2,
    },
    slider: {

    },
    controller: {
        width: 85,
        height: CONTROLLER_HEIGHT,
        borderRadius: 10,
        backgroundColor: theme.colors.colors.gray2,
        alignContent: 'center',
        overflow: 'hidden'
    },
    controllerValue: {
        position: 'absolute',
        top: 24,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    controllerOverlay: {
        width: 85,
        backgroundColor: theme.colors.colors.accent,
    }
})