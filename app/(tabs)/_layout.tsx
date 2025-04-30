import { Stack } from 'expo-router';
import React from 'react';
import { ThemeProvider } from '@/components/ThemeContext';
import { Platform } from 'react-native';

export default function Layout() {
    return (
        <ThemeProvider>
            <Stack
                screenOptions={{
                    headerShown: true,
                    headerTitle: 'Deed Chain',
                    headerStyle: {
                        backgroundColor: '#f7faff',
                        elevation: 0, // for Android
                        shadowOpacity: 0, // for iOS
                        borderBottomWidth: 0, // remove line if present
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                        fontWeight: '600',
                        fontFamily: Platform.select({
                            ios: 'Georgia',
                            android: 'serif',
                        }),
                        color: '#1D3557',
                        letterSpacing: 1.2,
                        textShadowColor: '#00000020',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 3,
                        textAlign: 'center',
                    },
                    headerTitleAlign: 'center',
                }}
            >
                <Stack.Screen name="index" />
            </Stack>
        </ThemeProvider>
    );
}
