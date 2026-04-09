import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base design dimensions (iPhone 11 / standard design)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Scale a value based on screen width relative to base design width.
 * Use for horizontal dimensions: width, paddingHorizontal, marginHorizontal, etc.
 */
export const wp = (size) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(size * scale);
};

/**
 * Scale a value based on screen height relative to base design height.
 * Use for vertical dimensions: height, paddingVertical, marginVertical, etc.
 */
export const hp = (size) => {
  const scale = SCREEN_HEIGHT / BASE_HEIGHT;
  return Math.round(size * scale);
};

/**
 * Moderate scale - less aggressive scaling for fonts, icons, border radius.
 * factor: 0 = no scaling, 1 = full scaling (default 0.5)
 */
export const ms = (size, factor = 0.5) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  return Math.round(size + (scale - 1) * size * factor);
};

/**
 * Font scale - uses moderate scaling to prevent fonts from becoming too large/small.
 */
export const fs = (size) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Percentage of screen width
 */
export const widthPercent = (percent) => {
  return (SCREEN_WIDTH * percent) / 100;
};

/**
 * Percentage of screen height
 */
export const heightPercent = (percent) => {
  return (SCREEN_HEIGHT * percent) / 100;
};

/**
 * Check if device is a small screen (e.g., iPhone SE, small Android)
 */
export const isSmallDevice = SCREEN_WIDTH < 360;

/**
 * Check if device is a large screen (tablets, large phones)
 */
export const isLargeDevice = SCREEN_WIDTH >= 414;

export { SCREEN_WIDTH, SCREEN_HEIGHT };
