import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, ScaledSize, ViewStyle, StatusBar, Text } from 'react-native';
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
        return (
            <MobileVideo
                source={{ uri: source }}
                style={style}
                resizeMode="cover"
                repeat={true}
                muted={true}
                playInBackground={false}
                playWhenInactive={false}
                ignoreSilentSwitch="ignore"
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

    const video = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    const getVideoStyles = (): ViewStyle => {
        const width = dimensions.width;
        const videoHeight = Platform.OS === 'web' ? '85vh' as any : dimensions.height * 0.85;
        
        return {
            width,
            height: videoHeight,
        };
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.contentContainer}>
                <View style={[styles.videoWrapper, getVideoStyles()]}>
                    <DynamicVideoPlayer
                        source={video}
                        style={styles.video}
                    />
                </View>
                <View style={styles.textSection}>
                    <View style={styles.textContent}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                            Video Title
                        </Text>
                        <Text style={styles.description}>
                            This is a detailed description of the video. It can contain multiple lines of text
                            explaining what the video is about and providing additional information to the viewer.
                        </Text>
                        <View style={styles.metadata}>
                            <Text style={styles.metadataText}>Views: 1.2M</Text>
                            <Text style={styles.metadataText}>Duration: 2:30</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#000',
        ...(Platform.OS === 'web' && {
            height: '100vh',
            overflow: 'hidden',
        }),
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    videoWrapper: {
        backgroundColor: '#111',
        overflow: 'hidden',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    textSection: {
        height: Platform.OS === 'web' ? '15vh' : '15%',
        backgroundColor: '#111',
        padding: 10,
        justifyContent: 'center',
    },
    textContent: {
        maxWidth: Platform.OS === 'web' ? 800 : '100%',
        alignSelf: 'center',
        width: '100%',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        color: '#ccc',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
    },
    metadata: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    metadataText: {
        color: '#999',
        fontSize: 12,
    },
});

export default App;
