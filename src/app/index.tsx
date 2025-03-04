import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, ScaledSize, ViewStyle, StatusBar } from 'react-native';
import { ThemeProvider, ThemeContext } from '../config';
import dynamic from 'next/dynamic';

// Separate components for web and mobile
const WebVideo = ({ source, style }: any) => (
    <video
        src={source}
        style={{
            ...style,
            objectFit: 'cover',
        }}
        autoPlay
        loop
        muted
        playsInline
        controls
    />
);

// Dynamically import react-native-video only for mobile
const MobileVideo = Platform.OS === 'web' ? null : require('react-native-video').default;

const VideoPlayer = ({ source, style }: any) => {
    if (Platform.OS === 'web') {
        return <WebVideo source={source} style={style} />;
    }

    if (MobileVideo) {
        const videoSource = {
            uri: source,
            type: 'mp4',
            isNetwork: true,
            cache: false,
        };
            
        return (
            <MobileVideo
                source={videoSource}
                style={style}
                resizeMode="cover"
                repeat={true}
                muted={true}
                playInBackground={false}
                playWhenInactive={false}
                ignoreSilentSwitch="ignore"
                controls={true}
                paused={false}
            />
        );
    }

    return null;
};

// Wrap the entire component with dynamic import to prevent SSR
const DynamicVideoPlayer = dynamic(() => Promise.resolve(VideoPlayer), {
    ssr: false
});

const App = () => (
    <ThemeProvider>
        <AppThemed />
    </ThemeProvider>
);

const AppThemed = () => {
    const { theme } = React.useContext(ThemeContext);
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    useEffect(() => {
        const onChange = ({ window }: { window: ScaledSize }) => {
            setDimensions(window);
        };

        const subscription = Dimensions.addEventListener('change', onChange);

        return () => {
            if (subscription?.remove) {
                subscription.remove();
            }
        };
    }, []);

    return (
        <View style={styles.pageContainer}>
            <View style={[
                styles.mainContainer,
                Platform.OS === 'web' && styles.webContainer
            ]}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />
                <View style={styles.videoContainer}>
                    <DynamicVideoPlayer
                        source={videoSource}
                        style={styles.video}
                        resizeMode="cover"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Platform.OS === 'web' ? Dimensions.get('window').height : '100%',
        height: Platform.OS === 'web' ? Dimensions.get('window').height : '100%',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
    },
    webContainer: {
        width: 390, // iPhone 12/13/14 width
        minHeight: '100%',
        height: '100%',
    },
    videoContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    video: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
});

export default App;
