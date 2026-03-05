import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../constants/theme';

/**
 * Auto-Massage Screen
 * Lists available self-massage exercises.
 */
export default function AutoMassageScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color={AppColors.primary.green}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Auto-massage</Text>
                <View style={styles.backButton} />
            </View>

            {/* Placeholder content */}
            <View style={styles.content}>
                <Ionicons
                    name="hand-left-outline"
                    size={64}
                    color={AppColors.primary.green40}
                />
                <Text style={styles.placeholderText}>
                    Les exercices d'auto-massage seront bientôt disponibles.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.surface,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: AppColors.primary.green,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
        gap: 16,
    },
    placeholderText: {
        fontSize: 16,
        color: AppColors.primary.green65,
        textAlign: 'center',
    },
});
