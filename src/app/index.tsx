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

const VideoPlayer = ({ source, style }: any) => {
    if (Platform.OS === 'web') {
        return <WebVideo source={source} style={style} />;
    }

    if (MobileVideo) {
        // For mobile, ensure source is properly formatted
        const videoSource = typeof source === 'string' 
            ? { uri: source }
            : source;
            
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
    const video2 = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

    const getVideoStyles = (isMainVideo: boolean): ViewStyle => {
        const containerWidth = Platform.OS === 'web' 
            ? Math.min(dimensions.width - 40, 1200) // 40px for padding (20px each side), max width 1200px
            : dimensions.width - 20; // 20px for padding (10px each side)
        
        // Calculate widths based on 3:2 ratio (60% - 40%)
        const availableWidth = containerWidth - 20; // 20px gap between videos
        const videoWidth = isMainVideo 
            ? availableWidth * 0.6 // 60% for main video
            : availableWidth * 0.4; // 40% for secondary video
            
        const videoHeight = Platform.OS === 'web' 
            ? '60vh' as any 
            : dimensions.height * 0.4; // 40% of screen height for mobile
        
        return {
            width: videoWidth,
            height: videoHeight,
        };
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <View style={styles.contentContainer}>
                <View style={styles.centerContainer}>
                    {/* Videos Section */}
                    <View style={styles.videosContainer}>
                        <View style={[styles.videoWrapper, getVideoStyles(true)]}>
                            <DynamicVideoPlayer
                                source={video}
                                style={styles.video}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={[styles.videoWrapper, getVideoStyles(false)]}>
                            <DynamicVideoPlayer
                                source={video2}
                                style={styles.video}
                                resizeMode="cover"
                            />
                        </View>
                    </View>
                    
                    {/* Description Section */}
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.descriptionSection}>
                            <View style={styles.descriptionContent}>
                                <View style={styles.mainVideoInfo}>
                                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                                        Video Comparison
                                    </Text>
                                    <Text style={styles.description}>
                                        This is a side-by-side comparison of two videos. The left video shows "Big Buck Bunny" 
                                        while the right video shows "Elephant's Dream". Both are open-source animated films 
                                        that demonstrate different animation styles and storytelling techniques.
                                    </Text>
                                    <View style={styles.metadata}>
                                        <Text style={styles.metadataText}>Combined Views: 2.5M</Text>
                                        <Text style={styles.metadataText}>Average Duration: 2:30</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
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
    contentContainer: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    centerContainer: {
        flex: 1,
        width: '100%',
        maxWidth: 1200,
        alignSelf: 'center',
        padding: Platform.OS === 'web' ? 20 : 10,
    },
    videosContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        width: '100%',
        marginBottom: 16,
    },
    videoWrapper: {
        backgroundColor: '#111',
        overflow: 'hidden',
        borderRadius: 16,
        ...(Platform.OS === 'web' && {
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }),
    },
    video: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
    },
    scrollView: {
        flex: 1,
    },
    descriptionSection: {
        backgroundColor: '#111',
        padding: 24,
        borderRadius: 16,
        ...(Platform.OS === 'web' && {
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }),
    },
    descriptionContent: {
        width: '100%',
        maxWidth: 800,
        marginHorizontal: 'auto',
    },
    mainVideoInfo: {
        width: '100%',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        ...(Platform.OS === 'web' && {
            letterSpacing: 0.5,
        }),
    },
    description: {
        color: '#ccc',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        ...(Platform.OS === 'web' && {
            letterSpacing: 0.3,
        }),
    },
    metadata: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 20,
        marginTop: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    metadataText: {
        color: '#999',
        fontSize: 14,
        ...(Platform.OS === 'web' && {
            letterSpacing: 0.5,
        }),
    },
});

export default App;
