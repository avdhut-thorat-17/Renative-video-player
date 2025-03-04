import React from 'react';
import { View, StyleSheet, Text, Platform, Dimensions } from 'react-native';
import { VideoPlayer } from '../components/VideoPlayer';

const FullVerticalWithText = () => {
    const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    return (
        <View style={styles.container}>
            <View style={[
                styles.mainContainer,
                Platform.OS === 'web' && styles.webContainer
            ]}>
                <View style={styles.videoContainer}>
                    <VideoPlayer
                        source={videoSource}
                        style={styles.video}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Big Buck Bunny</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    },
    webContainer: {
        width: 390, // iPhone 12/13/14 width
    },
    videoContainer: {
        flex: 1,
        width: '100%',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    titleText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default FullVerticalWithText; 