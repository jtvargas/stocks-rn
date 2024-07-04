import { View, type ViewProps } from 'react-native';
import { Box } from '@gluestack-ui/themed';
import type { ComponentProps } from 'react';

import { useThemeColor } from '@/hooks/useThemeColor';

// Extract props type from the Box component
type BoxProps = ComponentProps<typeof Box>;

export type ThemedViewProps = ViewProps & BoxProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, bg,  ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <Box  {...otherProps} bgColor={ bg || backgroundColor}/>;
}
