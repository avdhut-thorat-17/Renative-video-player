import React from 'react';
import { ThemeProvider } from '../config';
import { NavigationProvider } from './navigation/NavigationProvider';

const App = () => {
    return (
        <ThemeProvider>
            <NavigationProvider />
        </ThemeProvider>
    );
};

export default App;
