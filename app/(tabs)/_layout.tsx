import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { AppColors } from '../../constants/theme';

/**
 * Tab Layout - Bottom tab navigation
 * Matches the Cephalib design with 5 tabs:
 * Home, Chat, Brain (center logo), Stats, Settings
 */
export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: AppColors.primary.green,
                tabBarInactiveTintColor: AppColors.primary.green40,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'chatbubble' : 'chatbubble-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="brain"
                options={{
                    tabBarIcon: () => (
                        <View style={styles.brainIconContainer}>
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={styles.brainIcon}
                                resizeMode="contain"
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="stats"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'bar-chart' : 'bar-chart-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'settings' : 'settings-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: AppColors.background,
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        height: Platform.OS === 'ios' ? 88 : 64,
        paddingTop: 8,
    },
    brainIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Platform.OS === 'ios' ? 20 : 8,
    },
    brainIcon: {
        width: 52,
        height: 52,
    },
});
