/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */



const tintColorLight = '#00A676'; // Green for light mode
const tintColorDark = '#00A676'; // Green for dark mode

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F5F5F5', // Subtle white for light mode background
    tint: tintColorLight,
    icon: '#00A676', // Green for icons in light mode
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#1E1E1E', // Subtle black for dark mode background
    tint: tintColorDark,
    icon: '#00A676', // Green for icons in dark mode
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};