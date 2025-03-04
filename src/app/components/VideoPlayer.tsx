import React from 'react';
import { Platform } from 'react-native';
import dynamic from 'next/dynamic';

// Web Video Component
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

// Mobile Video Component
const MobileVideo = Platform.OS === 'web' ? null : require('react-native-video').default;

export const VideoPlayer = ({ source, style, isSecondVideo = false }: any) => {
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