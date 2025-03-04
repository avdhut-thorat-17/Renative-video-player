import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, ScaledSize, ViewStyle, StatusBar, Text, ScrollView } from 'react-native';
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

const VideoPlayer = ({ source, style, isSecondVideo = false }: any) => {
    if (Platform.OS === 'web') {
        return <WebVideo source={source} style={style} />;
    }

    if (MobileVideo) {
        // For mobile, ensure each video has its own unique configuration
        const videoSource = {
            uri: source,
            type: 'mp4',
            isNetwork: true,
            cache: false, // Disable caching to prevent source mixing
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
                key={isSecondVideo ? 'video2' : 'video1'} // Ensure unique instances
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

    // Define different video sources
    const videos = {
        video1: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        video2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    };

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

    const getVideoStyles = (isMainVideo: boolean): ViewStyle => {
        const padding = 12;
        const containerWidth = dimensions.width - (padding * 2);
        const gap = 8;
        
        const availableWidth = containerWidth - gap;
        const videoWidth = isMainVideo 
            ? availableWidth * 0.6
            : availableWidth * 0.4;
            
        return {
            width: videoWidth,
            height: dimensions.height - (padding * 2),
        };
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.videosContainer}>
                {/* First Video */}
                <View style={[styles.videoWrapper, getVideoStyles(true)]}>
                    <DynamicVideoPlayer
                        source={videos.video1}
                        style={styles.video}
                        resizeMode="cover"
                        isSecondVideo={false}
                    />
                </View>
                {/* Second Video */}
                <View style={[styles.videoWrapper, getVideoStyles(false)]}>
                    <DynamicVideoPlayer
                        source={videos.video2}
                        style={styles.video}
                        resizeMode="cover"
                        isSecondVideo={true}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    videosContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        gap: 8,
    },
    videoWrapper: {
        backgroundColor: '#111',
        borderRadius: 12,
        overflow: 'hidden',
        ...(Platform.OS === 'web' && {
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }),
    },
    video: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
});

export default App;
