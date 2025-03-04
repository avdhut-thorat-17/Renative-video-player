import React from 'react';
import { View, StyleSheet, Text, Platform, Dimensions } from 'react-native';
import { VideoPlayer } from '../components/VideoPlayer';

const TwoVideosWithDesc = () => {
    const videoSources = {
        video1: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        video2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    };

    return (
        <View style={styles.container}>
            <View style={styles.videosContainer}>
                <View style={styles.videoWrapper}>
                    <VideoPlayer
                        source={videoSources.video1}
                        style={styles.video}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.videoWrapper}>
                    <VideoPlayer
                        source={videoSources.video2}
                        style={styles.video}
                        resizeMode="cover"
                    />
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.title}>Featured Videos</Text>
                <Text style={styles.description}>
                    Watch our curated selection of animated shorts featuring "Big Buck Bunny" and 
                    "Elephant's Dream". These open-source films showcase creative storytelling and 
                    amazing animation techniques.
                </Text>
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
        flex: 0.7,
        flexDirection: 'row',
    },
    videoWrapper: {
        flex: 1,
        margin: 1,
    },
    video: {
        width: '100%',
        height: '100%',
    },
    descriptionContainer: {
        flex: 0.3,
        padding: 16,
        backgroundColor: '#1a1a1a',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        color: '#ccc',
        fontSize: 16,
        lineHeight: 24,
    },
});

export default TwoVideosWithDesc; 