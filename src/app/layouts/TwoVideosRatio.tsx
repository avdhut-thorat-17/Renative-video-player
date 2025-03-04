import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { VideoPlayer } from '../components/VideoPlayer';

const TwoVideosRatio = () => {
    const videoSources = {
        video1: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        video2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    };

    return (
        <View style={styles.container}>
            <View style={styles.videosContainer}>
                <View style={[styles.videoWrapper, styles.mainVideo]}>
                    <VideoPlayer
                        source={videoSources.video1}
                        style={styles.video}
                        resizeMode="cover"
                    />
                </View>
                <View style={[styles.videoWrapper, styles.secondaryVideo]}>
                    <VideoPlayer
                        source={videoSources.video2}
                        style={styles.video}
                        resizeMode="cover"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    videosContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    videoWrapper: {
        height: '100%',
    },
    mainVideo: {
        width: '60%', // 3 parts of 5
    },
    secondaryVideo: {
        width: '40%', // 2 parts of 5
    },
    video: {
        width: '100%',
        height: '100%',
    },
});

export default TwoVideosRatio; 