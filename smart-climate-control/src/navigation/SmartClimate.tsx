import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../screens/Dashboard';
import Settings from '../screens/Settings';
import { TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Paho from 'paho-mqtt';
import { useAppDispatch } from '../hooks'
import { setTemperature, putTemperatures } from '../store/temperature/slice';
import { setHumidity, putHumidity } from '../store/humidity/slice';
import { setLight, setPump, setFan } from '../store/replay/slice';

import * as theme from '../constants/theme';


// Define the types for your navigation params
export type RootStackParamList = {
    Dashboard: undefined; // No parameters for the Dashboard screen
    Settings: { name: string }; // Assuming Settings screen needs a userId parameter
};

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();


const SmartClimate: React.FC = () => {
    const arrayTopic = ["/feeds/temp/V1", "/feeds/moi/V1", "/feeds/light/V1", "/feeds/pump/V1", "/feeds/fan/V1"];
    const username = 'group114';

    const dispatch = useAppDispatch();

    const client = new Paho.Client('mqtt.ohstem.vn', 8083, 'dsfgfdsgfdsgsadas');
    useEffect((): void => {
        client.connect({
            userName: username,
            password: '12345678',
            onSuccess() {
                console.log('Connected');
                subscribeToTopic(client);
            },
            onFailure() {
                console.log('fail');
            }
        });
        client.onMessageArrived = (message) => {
            switch (message.destinationName) {
                case username + '/feeds/temp/V1':
                    console.log('temperature:' + message.payloadString)
                    dispatch(setTemperature(parseFloat(message.payloadString)));
                    dispatch(putTemperatures(parseFloat(message.payloadString)));
                    break;
                case username + '/feeds/moi/V1':
                    console.log('humidity:' + message.payloadString)
                    dispatch(setHumidity(parseFloat(message.payloadString)));
                    dispatch(putHumidity(parseFloat(message.payloadString)));
                    break;
                case username + '/feeds/light/V1':
                    console.log('light:' + message.payloadString)
                    dispatch(setLight(parseInt(message.payloadString) > 0 ? true : false))
                    break;
                case username + '/feeds/pump/V1':
                    console.log('pump:' + message.payloadString)
                    dispatch(setPump(parseInt(message.payloadString) > 0 ? true : false))
                    break;
                case username + '/feeds/fan/V1':
                    console.log('fan:' + message.payloadString)
                    dispatch(setFan(parseInt(message.payloadString) > 0 ? true : false))
                    break;
                default:
                    break;
            }
            console.log('onMessageArrived:' + message.payloadString);
        };
    }, []);

    const subscribeToTopic = (client: Paho.Client) => {
        for (let index = 0; index < arrayTopic.length; index++) {
            client.subscribe(username + arrayTopic[index]);
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard">
                <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
                    {(props) => <Dashboard {...props} pahoClient={client} />}
                </Stack.Screen>
                <Stack.Screen name="Settings" component={Settings} options={({ navigation, route }) => ({
                    headerLeft: () => (
                        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                            <FontAwesome size={theme.sizes.sizes.font * 1.5} color={theme.colors.colors.black} name="arrow-left" />
                        </TouchableWithoutFeedback>
                    ),
                    headerLeftContainerStyle: {
                        paddingLeft: theme.sizes.sizes.base * 2,
                    },
                    headerStyle: {
                        borderBottomColor: 'transparent',
                    },
                    title: route.params.name[0].toUpperCase() + route.params.name.substring(1)
                })} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default SmartClimate;