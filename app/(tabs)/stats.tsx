import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../constants/theme';

export default function StatsScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.center}>
                <Text style={styles.title}>Statistiques</Text>
                <Text style={styles.subtitle}>Bientôt disponible</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: AppColors.surface },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 20, fontWeight: '600', color: AppColors.primary.green },
    subtitle: { fontSize: 14, color: AppColors.primary.green40, marginTop: 8 },
});
