import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../constants/theme';
import { useAuth } from '../../context/auth-context';

export default function SettingsScreen() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        Alert.alert('Déconnexion', 'Voulez-vous vous déconnecter ?', [
            { text: 'Annuler', style: 'cancel' },
            {
                text: 'Déconnexion',
                style: 'destructive',
                onPress: async () => {
                    await logout();
                },
            },
        ]);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.content}>
                <Text style={styles.title}>Paramètres</Text>

                <View style={styles.section}>
                    <Text style={styles.label}>Compte</Text>
                    <Text style={styles.value}>{user?.email ?? '—'}</Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={20} color={AppColors.accent.red} />
                    <Text style={styles.logoutText}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: AppColors.surface },
    content: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: AppColors.primary.green,
        marginBottom: 32,
    },
    section: { marginBottom: 24 },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: AppColors.primary.green,
        letterSpacing: 1,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    value: { fontSize: 15, color: AppColors.primary.green65 },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 16,
    },
    logoutText: {
        fontSize: 15,
        color: AppColors.accent.red,
        fontWeight: '500',
    },
});
