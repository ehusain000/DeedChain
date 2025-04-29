import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Animated, Dimensions, Platform } from 'react-native';
import deeds from '@/assets/good_deeds.json';
import ConfettiCannon from 'react-native-confetti-cannon';
import successMessages from '@/constants/successMessages';
import { useTheme } from '@/components/ThemeContext';

const getRandomDeed = () => {
    const randomIndex = Math.floor(Math.random() * deeds.length);
    return deeds[randomIndex];
};

export default function HomeScreen() {

    const { theme, toggleTheme } = useTheme();
    const [deed, setDeed] = useState('');
    const [message, setMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;


    const bounceAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        loadRandomDeed();
    }, []);

    const getRandomItem = <T,>(list: T[]): T => list[Math.floor(Math.random() * list.length)];

    const loadRandomDeed = () => {
        const newDeed = getRandomItem(deeds);
        setDeed(newDeed);
        setMessage('');
        bounce();
    };

    const getRandomSuccessMessage = () => getRandomItem(successMessages);

    const bounce = () => {
        bounceAnim.setValue(0.95);
        Animated.spring(bounceAnim, {
            toValue: 1,
            friction: 2,
            tension: 80,
            useNativeDriver: true,
        }).start();
    };

    const handleDone = () => {
        if (buttonDisabled) return;

        setButtonDisabled(true);
        setMessage(getRandomSuccessMessage());
        setShowConfetti(true);

        // Fade in the message
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            // Fade out after 4 seconds
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setShowConfetti(false);
                setButtonDisabled(false);
                loadRandomDeed();
            });
        }, 4000);
    };


    const handleShare = async () => {
        try {
            await Share.share({
                message: `Today's good deed: "${deed}". Let's make the world better together.`,
            });
        } catch (error: any) {
            console.error('Error sharing deed:', error?.message || error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1C1C1E' : '#F9FAFB' }]}>
            {/* THEME TOGGLE BUTTON */}
            <TouchableOpacity
                style={styles.themeButton}
                onPress={toggleTheme}
            >
                <Text style={styles.themeButtonText}>{theme === 'light' ? '🌙' : '☀️'}</Text>
            </TouchableOpacity>

            <Animated.View style={[styles.card, { transform: [{ scale: bounceAnim }] }]}>
                <Text style={styles.deedText}>{deed}</Text>
            </Animated.View>

            <Animated.View style={[styles.messageBox, { opacity: fadeAnim }]}>
                {message ? <Text style={styles.messageText}>{message}</Text> : null}
            </Animated.View>

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    accessibilityLabel="Mark deed as completed"
                    accessibilityHint="Celebrates and loads a new good deed."
                    style={[styles.buttonPrimary, buttonDisabled && styles.buttonDisabled]}
                    onPress={handleDone}
                    disabled={buttonDisabled}
                >
                    <Text style={styles.buttonText}>I Did It</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={loadRandomDeed}>
                    <Text style={styles.buttonSecondaryText}>New Deed</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonTertiary} onPress={handleShare}>
                    <Text style={styles.buttonTertiaryText}>Share</Text>
                </TouchableOpacity>
            </View>

            {showConfetti && (
                <ConfettiCannon count={120} origin={{ x: Dimensions.get('window').width / 2, y: 0 }} fadeOut={true} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 28,
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOpacity: Platform.OS === 'ios' ? 0.07 : 0.1,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 20,
        elevation: 8,
        width: '100%',
        maxWidth: 500,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deedText: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: '#1C1C1E', // deep graphite Apple color
        lineHeight: 32,
    },
    messageBox: {
        backgroundColor: '#E8F5E9',
        padding: 18,
        borderRadius: 16,
        marginBottom: 20,
        width: '100%',
        maxWidth: 500,
    },
    messageText: {
        color: '#1B5E20',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 26,
    },
    buttonGroup: {
        width: '100%',
        maxWidth: 500,
    },
    buttonPrimary: {
        backgroundColor: '#007AFF', // iOS blue
        paddingVertical: 14,
        borderRadius: 14,
        marginBottom: 12,
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#34C759', // iOS green
        paddingVertical: 14,
        borderRadius: 14,
        marginBottom: 12,
        alignItems: 'center',
    },
    buttonTertiary: {
        backgroundColor: '#F2F2F7', // muted gray
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#A5D6A7',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonSecondaryText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonTertiaryText: {
        color: '#1C1C1E',
        fontSize: 16,
        fontWeight: '500',
    },
    themeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#ffffff80',
        padding: 10,
        borderRadius: 20,
        zIndex: 1000,
    },
    themeButtonText: {
        fontSize: 24,
    }
});
