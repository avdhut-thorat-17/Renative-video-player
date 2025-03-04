import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Import layouts
import FullScreenVideo from '../layouts/FullScreenVideo';
import TwoVideosWithDesc from '../layouts/TwoVideosWithDesc';
import TwoVideosRatio from '../layouts/TwoVideosRatio';
import FullVerticalMobile from '../layouts/FullVerticalMobile';
import FullVerticalWithText from '../layouts/FullVerticalWithText';
import TwoVerticalVideos from '../layouts/TwoVerticalVideos';

const Drawer = createDrawerNavigator();

export const NavigationProvider = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="FullScreenVideo"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    drawerStyle: {
                        backgroundColor: '#1a1a1a',
                        width: Platform.OS === 'web' ? 300 : 280,
                    },
                    drawerLabelStyle: {
                        color: '#fff',
                    },
                }}
            >
                <Drawer.Screen 
                    name="FullScreenVideo" 
                    component={FullScreenVideo}
                    options={{ title: 'Full Screen with Description' }}
                />
                <Drawer.Screen 
                    name="TwoVideosWithDesc" 
                    component={TwoVideosWithDesc}
                    options={{ title: 'Two Videos with Description' }}
                />
                <Drawer.Screen 
                    name="TwoVideosRatio" 
                    component={TwoVideosRatio}
                    options={{ title: 'Two Videos (3:2 Ratio)' }}
                />
                <Drawer.Screen 
                    name="FullVerticalMobile" 
                    component={FullVerticalMobile}
                    options={{ title: 'Full Vertical Mobile' }}
                />
                <Drawer.Screen 
                    name="FullVerticalWithText" 
                    component={FullVerticalWithText}
                    options={{ title: 'Full Vertical with Text' }}
                />
                <Drawer.Screen 
                    name="TwoVerticalVideos" 
                    component={TwoVerticalVideos}
                    options={{ title: 'Two Vertical Videos' }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}; 