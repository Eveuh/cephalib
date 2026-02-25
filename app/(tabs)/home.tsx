import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { AppColors } from '../../constants/theme';
import { useAuth } from '../../context/auth-context';

/**
 * Home Screen
 * Displays the main dashboard with self-care options, chat, and monthly summary.
 */
export default function HomeScreen() {
    const { user } = useAuth();
    const firstName = user?.name ?? 'Eve';

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Greeting */}
                <Text style={styles.greeting}>
                    Hello {firstName},{'\n'}Aujourd'hui, prenons soin de toi.
                </Text>

                {/* S'OCCUPER DE SOI */}
                <Text style={styles.sectionTitle}>S'OCCUPER DE SOI</Text>
                <View style={styles.cardsRow}>
                    <SelfCareCard
                        title="Exercices audio"
                        icon={
                            <Ionicons
                                name="headset-outline"
                                size={48}
                                color={AppColors.primary.green}
                            />
                        }
                    />
                    <SelfCareCard
                        title="Auto-massage"
                        icon={
                            <Ionicons
                                name="hand-left-outline"
                                size={48}
                                color={AppColors.primary.green}
                            />
                        }
                    />
                </View>

                {/* EN PARLER */}
                <Text style={styles.sectionTitle}>EN PARLER</Text>
                <TouchableOpacity style={styles.chatCard} activeOpacity={0.7}>
                    <Ionicons
                        name="chatbubble-outline"
                        size={22}
                        color={AppColors.secondary.peach}
                    />
                    <Text style={styles.chatCardText}>Discuter avec Cépha</Text>
                </TouchableOpacity>

                {/* CE MOIS-CI */}
                <Text style={styles.sectionTitle}>CE MOIS-CI</Text>
                <View style={styles.monthCard}>
                    <View style={styles.monthStats}>
                        <StatLine value="3" label="exercices audio" />
                        <StatLine value="1" label="massage" />
                        <StatLine value="1" label="discussion avec cépha" />
                    </View>
                    <View style={styles.monthRing}>
                        <ProgressRing progress={0.7} size={130} strokeWidth={12} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ───── Sub-components ───── */

function SelfCareCard({
    title,
    icon,
}: {
    title: string;
    icon: React.ReactNode;
}) {
    return (
        <TouchableOpacity style={styles.selfCareCard} activeOpacity={0.7}>
            <View style={styles.selfCareCardInner}>
                <View style={styles.cardIconWrap}>{icon}</View>
                <TouchableOpacity style={styles.arrowButton}>
                    <Ionicons
                        name="arrow-up-outline"
                        size={18}
                        color={AppColors.primary.green}
                        style={{ transform: [{ rotate: '45deg' }] }}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.selfCareLabel}>{title}</Text>
        </TouchableOpacity>
    );
}

function StatLine({ value, label }: { value: string; label: string }) {
    return (
        <Text style={styles.statText}>
            <Text style={styles.statValue}>{value} </Text>
            <Text style={styles.statLabel}>{label}</Text>
        </Text>
    );
}

function ProgressRing({
    progress,
    size,
    strokeWidth,
}: {
    progress: number;
    size: number;
    strokeWidth: number;
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <Svg width={size} height={size}>
            {/* Background circle */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={AppColors.secondary.peach50}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
            />
            {/* Progress arc */}
            <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={AppColors.secondary.peach}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${circumference}`}
                strokeDashoffset={strokeDashoffset}
                rotation="-90"
                origin={`${size / 2}, ${size / 2}`}
            />
        </Svg>
    );
}

/* ───── Styles ───── */

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.surface,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 32,
    },
    greeting: {
        fontSize: 26,
        fontStyle: 'italic',
        color: AppColors.primary.green,
        marginTop: 24,
        marginBottom: 24,
        lineHeight: 34,
    },

    /* Section titles */
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: AppColors.primary.green,
        letterSpacing: 1,
        marginBottom: 12,
        marginTop: 16,
    },

    /* S'OCCUPER DE SOI cards */
    cardsRow: {
        flexDirection: 'row',
        gap: 14,
        marginBottom: 8,
    },
    selfCareCard: {
        flex: 1,
        backgroundColor: AppColors.background,
        borderRadius: 18,
        padding: 16,
        minHeight: 160,
        justifyContent: 'space-between',
    },
    selfCareCardInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardIconWrap: {
        width: 80,
        height: 80,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: AppColors.primary.green40,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    cardImage: {
        width: 64,
        height: 64,
    },
    arrowButton: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selfCareLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: AppColors.primary.green,
        marginTop: 12,
    },

    /* EN PARLER card */
    chatCard: {
        backgroundColor: AppColors.background,
        borderRadius: 18,
        paddingHorizontal: 18,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    chatCardText: {
        fontSize: 15,
        color: AppColors.secondary.peach,
        fontWeight: '400',
    },

    /* CE MOIS-CI card */
    monthCard: {
        backgroundColor: AppColors.background,
        borderRadius: 18,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    monthStats: {
        flex: 1,
        gap: 12,
    },
    monthRing: {
        marginLeft: 12,
    },
    statText: {
        fontSize: 14,
        color: AppColors.primary.green,
    },
    statValue: {
        fontWeight: '700',
    },
    statLabel: {
        fontWeight: '400',
    },
});
