import React from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { VideoPlayer } from '../components/VideoPlayer';

const TwoVerticalVideos = () => {
    const videoSources = {
        video1: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        video2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    };

    return (
        <View style={styles.container}>
            <View style={[
                styles.mainContainer,
                Platform.OS === 'web' && styles.webContainer
            ]}>
                <View style={styles.videosContainer}>
                    <View style={styles.videoWrapper}>
                        <VideoPlayer
                            source={videoSources.video1}
                            style={styles.video}
                            resizeMode="cover"
                            isSecondVideo={false}
                        />
                    </View>
                    <View style={styles.videoWrapper}>
                        <VideoPlayer
                            source={videoSources.video2}
                            style={styles.video}
                            resizeMode="cover"
                            isSecondVideo={true}
                        />
                    </View>
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
        justifyContent: 'flex-start',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#000',
        width: '100%',
        height: '100%',
    },
    webContainer: {
        width: 390, // iPhone 12/13/14 width
    },
    videosContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    videoWrapper: {
        width: '100%',
        height: '50%',
    },
    video: {
        width: '100%',
        height: '100%',
    },
});

export default TwoVerticalVideos; 