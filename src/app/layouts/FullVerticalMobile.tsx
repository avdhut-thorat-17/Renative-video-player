import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { VideoPlayer } from '../components/VideoPlayer';

const FullVerticalMobile = () => {
    const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    return (
        <View style={styles.container}>
            <View style={[
                styles.videoContainer,
                Platform.OS === 'web' && styles.webContainer
            ]}>
                <VideoPlayer
                    source={videoSource}
                    style={styles.video}
                    resizeMode="cover"
                />
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
    videoContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
    },
    webContainer: {
        width: 390, // iPhone 12/13/14 width
    },
    video: {
        width: '100%',
        height: '100%',
    },
});

export default FullVerticalMobile; 