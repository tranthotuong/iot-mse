import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/SmartClimate';

import * as theme from '../constants/theme';
import { Block, Text } from '../components';
import mocks from '../constants/settings';
import { useAppSelector } from '../hooks';
import * as Paho from 'paho-mqtt';

// Assuming mocks is typed elsewhere, if not, define the type here
interface Settings {
    [key: string]: {
        name: string;
        icon: React.ElementType; // Adjust if needed
    };
}

interface PahoProps {
    pahoClient: Paho.Client,
}

// Define the props for Dashboard screen, assuming no additional props are needed beyond navigation
type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'> & PahoProps;
const Dashboard: React.FC<DashboardProps> = ({ navigation, pahoClient }) => {
    const hum = useAppSelector((state) => state.humidity.val);
    const temp = useAppSelector((state) => state.temperature.val);
    const light = useAppSelector((state) => state.replay.light);
    const pump = useAppSelector((state) => state.replay.pump);
    const fan = useAppSelector((state) => state.replay.fan);
    // Assuming settings is typed correctly in your project
    const settings: Settings = mocks;
    const LightIcon = settings['light'].icon;
    const ACIcon = settings['pump'].icon;
    // const TempIcon = settings['temperature'].icon;
    const FanIcon = settings['fan'].icon;
    // const WiFiIcon = settings['wi-fi'].icon;
    // const ElectricityIcon = settings['electricity'].icon;

    const username = 'group114'
    const pubLight = "/feeds/light/V2"
    const pubPump = "/feeds/pump/V2"
    const pubFan = "/feeds/fan/V2"

    function turnReplay(type: number, turn: "ON" | "OFF"): void {
        switch (type) {
            case 1:
                pahoClient.send(username + pubLight, turn)
                break;
            case 2:
                pahoClient.send(username + pubPump, turn)
                break;
            case 3:
                pahoClient.send(username + pubFan, turn)
                break;
            default:
                break;
        }
    }
    return (
        <Block style={styles.dashboard}>
            <Block column style={{ marginVertical: theme.sizes.sizes.base * 2, }}>
                <Text welcome>Hello</Text>
                <Text name>Tuong (Group1)</Text>
            </Block>

            <Block row style={{ paddingVertical: 10 }}>
                <Block flex={1.5} row style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Settings', { name: 'temperature' })}
                    >
                        <Block row style={{ alignItems: 'flex-end' }}>
                            <Text h1 size={70}>{temp == 0 ? temp : temp.toFixed(1)}</Text>
                            <Text h1 size={30} height={80} weight='600' spacing={0.1}>°C</Text>
                        </Block>
                    </TouchableOpacity>
                </Block>
                <Block flex={1} column>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Settings', { name: 'humidity' })}
                    >
                        <Text caption>Humidity</Text>
                        <Block row style={{ alignItems: 'center' }}>
                            <Text h1 size={60}>
                                {hum == 0 ? hum : hum.toFixed(1)}
                            </Text>
                            {/* <Text h1 size={34} height={80} weight='600' spacing={0.1}>°C</Text> */}
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../../assets/humidity.png')}
                            />
                        </Block>
                    </TouchableOpacity>
                </Block>
            </Block>

            <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
                <Block column space="between">
                    <Block row space="around" style={{ marginVertical: theme.sizes.sizes.base }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => light ? turnReplay(1, "OFF") : turnReplay(1, "ON")}
                        >
                            <Block center middle style={styles.button}>
                                <LightIcon size={38} color={light ? theme.colors.colors.accent2 : theme.colors.colors.accent}/>
                                <Text
                                    button
                                    style={{ marginTop: theme.sizes.sizes.base * 0.5 }}
                                >
                                    {settings['light'].name}
                                </Text>
                            </Block>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => pump ? turnReplay(2, "OFF") : turnReplay(2, "ON")}
                        >
                            <Block center middle style={styles.button}>
                                <ACIcon size={38} color={pump ? theme.colors.colors.accent2 : theme.colors.colors.accent}/>
                                <Text
                                    button
                                    style={{ marginTop: theme.sizes.sizes.base * 0.5 }}
                                >
                                    {settings['pump'].name}
                                </Text>
                            </Block>
                        </TouchableOpacity>
                    </Block>

                    <Block row space="around" style={{ marginVertical: theme.sizes.sizes.base }}>
                        {/* <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Settings', { name: 'temperature' })}
                        >
                            <Block center middle style={styles.button}>
                                <TempIcon size={38} />
                                <Text
                                    button
                                    style={{ marginTop: theme.sizes.sizes.base * 0.5 }}
                                >
                                    {settings['temperature'].name}
                                </Text>
                            </Block>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>  fan ? turnReplay(3, "OFF") : turnReplay(3, "ON")}
                        >
                            <Block center middle style={styles.button}>
                                <FanIcon size={38} color={fan ? theme.colors.colors.accent2 : theme.colors.colors.accent}/>
                                <Text
                                    button
                                    style={{ marginTop: theme.sizes.sizes.base * 0.5 }}
                                >
                                    {settings['fan'].name}
                                </Text>
                            </Block>
                        </TouchableOpacity>
                    </Block>

                    {/* <Block row space="around" style={{ marginVertical: theme.sizes.sizes.base }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Settings', { name: 'wi-fi' })}
                        >
                            <Block center middle style={styles.button}>
                                <WiFiIcon size={38} />
                                <Text
                                    button
                                    style={{ marginTop: theme.sizes.sizes.base * 0.5 }}
                                >
                                    {settings['wi-fi'].name}
                                </Text>
                            </Block>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Settings', { name: 'electricity' })}
                        >
                            <Block center middle style={styles.button}>
                                <ElectricityIcon size={38} />
                                <Text
                                    button
                                    style={{ marginTop: theme.sizes.sizes.base * 0.5 }}
                                >
                                    {settings['electricity'].name}
                                </Text>
                            </Block>
                        </TouchableOpacity>
                    </Block> */}
                </Block>
            </ScrollView>
        </Block>
    )
}

const styles = StyleSheet.create({
    dashboard: {
        flex: 1,
        padding: theme.sizes.sizes.base * 2,
        marginBottom: -theme.sizes.sizes.base * 6,
    },
    buttons: {
        flex: 1,
        marginBottom: -theme.sizes.sizes.base * 6,
    },
    button: {
        backgroundColor: theme.colors.colors.button,
        width: 151,
        height: 151,
        borderRadius: 151 / 2,
    }
})
export default Dashboard;
