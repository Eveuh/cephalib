import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

/**
 * Splash Screen with animated logo
 * Matches Flutter's splash animation:
 * - Rotation: 0→360° (continuous repeat for 2s, linear)
 * - Scale: 1.0→1.35 (easeOut)
 * - Exit: scale 1.35→12.0 (easeIn, 500ms)
 * - Total delay: 2000ms before exit animation
 */
export default function SplashScreen() {
  const router = useRouter();

  // Animation values
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const exitScale = useSharedValue(1.35);

  useEffect(() => {
    // Start rotation animation (continuous repeat)
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1, // Infinite repeat
      false
    );

    // Start scale animation (1.0 → 1.35)
    scale.value = withTiming(1.35, {
      duration: 2000,
      easing: Easing.out(Easing.ease),
    });

    // Trigger exit animation after 2 seconds
    const timer = setTimeout(() => {
      triggerExitAnimation();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Trigger exit animation and navigate to login
   */
  const triggerExitAnimation = () => {
    // Stop rotation (set to final value)
    rotation.value = 0;

    // Exit zoom animation (1.35 → 12.0)
    exitScale.value = withSequence(
      withTiming(12.0, {
        duration: 500,
        easing: Easing.in(Easing.ease),
      }),
      // After animation, navigate
      withTiming(12.0, { duration: 0 }, (finished) => {
        if (finished) {
          runOnJS(navigateToLogin)();
        }
      })
    );
  };

  /**
   * Navigate to login screen
   */
  const navigateToLogin = () => {
    router.replace('/(auth)/login');
  };

  // Animated style for rotation and scale
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value * exitScale.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        {/* Blur effect backdrop */}
        <View style={styles.blurBackdrop}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logoBlur}
            resizeMode="contain"
            blurRadius={12}
          />
        </View>

        {/* Main logo */}
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF5ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurBackdrop: {
    position: 'absolute',
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.05,
  },
  logoBlur: {
    width: 130,
    height: 130,
  },
  logo: {
    width: 120,
    height: 120,
  },
});
