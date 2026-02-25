import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBarBackground from '../../components/TabBarBackground';
import { AppColors } from '../../constants/theme';

/**
 * Tab Layout - Bottom tab navigation
 * Matches the Cephalib design with 5 tabs:
 * Home, Chat, Brain (center logo), Stats, Settings
 */
export default function TabLayout() {
    const insets = useSafeAreaInsets();
    const BASE_HEIGHT = Platform.OS === 'ios' ? 70 : 64;
    const TAB_BAR_HEIGHT = BASE_HEIGHT + insets.bottom;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: AppColors.primary.green,
                tabBarInactiveTintColor: AppColors.secondary.mint,
                tabBarStyle: [
                    styles.tabBar,
                    {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: TAB_BAR_HEIGHT,
                        paddingBottom: insets.bottom,
                        backgroundColor: 'transparent',
                    },
                ],
                tabBarShowLabel: false,
                tabBarBackground: () => <TabBarBackground />,
                tabBarItemStyle: { paddingTop: 30, },
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
                                source={require('../../assets/images/logo_rouge.png')}
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
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        paddingTop: 8,

    },
    brainIconContainer: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Platform.OS === 'ios' ? 60 : 16,
    },
    brainIcon: {
        width: 60,
        height: 60,
    },
});
