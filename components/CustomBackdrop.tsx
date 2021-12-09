import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => {
        console.log('index : ', animatedIndex)
        return {
            opacity: interpolate(
                animatedIndex.value,
                [0, 1, -1],
                [-1, 1, 0],
                Extrapolate.CLAMP
            ),
        }
    });
  
    // styles
    const containerStyle = useMemo(
      () => [
        style,
        {
          backgroundColor: '#000000',
        },
        containerAnimatedStyle,
      ],
      [style, containerAnimatedStyle]
    );
  
    return <Animated.View style={containerStyle} />;
};

export default CustomBackdrop
