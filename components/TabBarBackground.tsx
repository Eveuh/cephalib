import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { AppColors } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function TabBarBackground() {
    // Mets ici la hauteur de ton SVG (la même que dans Figma)
    const height = 88;

    const d = `M133.835 0.00872347C137.374 0.0636308 
            139.85 0.391022 141.975 1.54583C144.098 
            2.70019 145.807 4.64623 147.903 7.77728C149.736 
            10.5144 151.908 14.225 154.927 19.2011L156.273 
            21.412L156.278 21.4189L156.282 21.4267C157.252 
            23.1399 159.751 26.8368 162.276 30.3183C163.537 32.0558 
            164.798 33.7318 165.87 35.0712C166.954 36.4256 167.808 
            37.3869 168.269 37.748L168.304 37.7753L168.299 37.7812C176.251 
            44.6445 186.419 48.7635 197.501 48.7636C208.487 48.7636 218.575 44.7143 
            226.496 37.957C228.213 36.1465 230.676 33.0231 232.988 29.8788C235.462 26.5149 237.733 
            23.1716 238.708 21.4492C242.099 15.4583 244.459 11.1182 246.492 8.00579C248.528 4.8891 250.281 
            2.92938 252.492 1.74603C254.7 0.564797 257.303 0.190935 260.953 0.0985672C263.983 0.0219252 
            267.826 0.138044 272.836 0.179622C273.761 0.175044 274.725 0.181874 275.732 0.19427C275.818 
            0.194334 275.904 0.195247 275.99 0.195247H277.463L277.434 0.216731C280.958 0.26991 285.002 
            0.33905 289.753 0.172786H394V75.1728H0V0.172786H105.249C110.005 0.339253 114.054 0.269937 
            117.581 0.216731L117.524 0.172786H119C125.577 0.172786 130.322 -0.0457606 133.835 0.00872347Z`;

    return (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
            <Svg width={width} height={height} style={styles.svg} viewBox="0 0 394 76">
                <Path d={d} fill={AppColors.background} />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    svg: {
        position: 'absolute',
        bottom: 0,
    },
});