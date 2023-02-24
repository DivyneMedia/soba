import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const CustomBackdrop = ({ animatedIndex, style, onPress }: BottomSheetBackdropProps) => {
  const AnimatedTouchable = Animated.createAnimatedComponent(Pressable)

  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedIndex.value,
        [-1, 1, 0],
        [0, 1, -1],
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

  return <AnimatedTouchable onPress={onPress} style={containerStyle} />;
};

export default CustomBackdrop
