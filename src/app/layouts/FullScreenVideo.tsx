import React from 'react';
import { View, StyleSheet, Text, Platform, Dimensions } from 'react-native';
import { VideoPlayer } from '../components/VideoPlayer';

const FullScreenVideo = () => {
    const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    
    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <VideoPlayer
                    source={videoSource}
                    style={styles.video}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.title}>Big Buck Bunny</Text>
                <Text style={styles.description}>
                    A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, 
                    who are determined to squelch his happiness.
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
    videoContainer: {
        flex: 0.7,
        width: '100%',
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

export default FullScreenVideo; 