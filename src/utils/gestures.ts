import { useEffect, useRef } from 'react';
import { PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';

export interface SwipeGestureConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
}

export const useSwipeGesture = (config: SwipeGestureConfig) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
  } = config;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (
        evt: GestureResponderEvent,
        gestureState: PanResponderGestureState
      ) => {
        const { dx, dy } = gestureState;
        
        // Horizontal swipe
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
          if (dx > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (dx < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        }
        // Vertical swipe
        else if (Math.abs(dy) > threshold) {
          if (dy > 0 && onSwipeDown) {
            onSwipeDown();
          } else if (dy < 0 && onSwipeUp) {
            onSwipeUp();
          }
        }
      },
    })
  ).current;

  return panResponder;
};

export interface PinchGestureConfig {
  onPinchIn?: (scale: number) => void;
  onPinchOut?: (scale: number) => void;
  minScale?: number;
  maxScale?: number;
}

export const usePinchGesture = (config: PinchGestureConfig) => {
  const {
    onPinchIn,
    onPinchOut,
    minScale = 0.5,
    maxScale = 3,
  } = config;

  const initialDistance = useRef(0);
  const currentScale = useRef(1);

  const getDistance = (touches: any[]) => {
    if (touches.length < 2) return 0;
    const [touch1, touch2] = touches;
    const dx = touch1.pageX - touch2.pageX;
    const dy = touch1.pageY - touch2.pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => evt.nativeEvent.touches.length === 2,
      onMoveShouldSetPanResponder: (evt) => evt.nativeEvent.touches.length === 2,
      onPanResponderGrant: (evt) => {
        if (evt.nativeEvent.touches.length === 2) {
          initialDistance.current = getDistance(evt.nativeEvent.touches);
        }
      },
      onPanResponderMove: (evt) => {
        if (evt.nativeEvent.touches.length === 2) {
          const distance = getDistance(evt.nativeEvent.touches);
          const scale = distance / initialDistance.current;
          const newScale = Math.max(minScale, Math.min(maxScale, currentScale.current * scale));
          
          if (scale > 1 && onPinchOut) {
            onPinchOut(newScale);
          } else if (scale < 1 && onPinchIn) {
            onPinchIn(newScale);
          }
        }
      },
      onPanResponderRelease: () => {
        initialDistance.current = 0;
      },
    })
  ).current;

  return { panResponder, currentScale };
};

export interface LongPressConfig {
  onLongPress: () => void;
  delay?: number;
}

export const useLongPress = (config: LongPressConfig) => {
  const { onLongPress, delay = 500 } = config;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        timerRef.current = setTimeout(() => {
          onLongPress();
        }, delay);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Cancel if finger moves too much
        if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10) {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        }
      },
      onPanResponderRelease: () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      },
    })
  ).current;

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return panResponder;
};
