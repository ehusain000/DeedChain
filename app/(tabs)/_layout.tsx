import { Stack } from 'expo-router';
import React from 'react';
import { ThemeProvider } from '@/components/ThemeContext'; // adjust path if needed

export default function Layout() {
    return (
        <ThemeProvider>
            <Stack
                screenOptions={{
                    headerShown: true,
                    headerTitle: 'Deed Chain',
                    headerStyle: {
                        backgroundColor: '#f7faff',
                    },
                    headerTitleStyle: {
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#1D3557',
                    },
                }}
            >
                <Stack.Screen name="index" />
            </Stack>
        </ThemeProvider>
    );
}
