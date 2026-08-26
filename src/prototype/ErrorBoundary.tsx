import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { color, radius, space, typography } from '@/design/tokens';

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export class PrototypeErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[PayDala prototype]', error, info.componentStack);
  }

  render(): ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <View style={styles.wrap}>
        <Text style={styles.kicker}>Reference prototype</Text>
        <Text style={styles.title}>This view hit an error</Text>
        <Text style={styles.body}>
          The rest of the demo can continue after a reset. No real payment was attempted.
        </Text>
        {__DEV__ ? <Text style={styles.dev}>{this.state.error.message}</Text> : null}
        <Pressable
          accessibilityRole="button"
          onPress={() => this.setState({ error: null })}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>Continue</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: color.background,
    justifyContent: 'center',
    padding: space[24],
    gap: space[12],
  },
  kicker: {
    ...typography.label,
    color: color.textTertiary,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.title,
    color: color.textPrimary,
  },
  body: {
    ...typography.body,
    color: color.textSecondary,
  },
  dev: {
    ...typography.caption,
    color: color.danger,
  },
  button: {
    marginTop: space[8],
    alignSelf: 'flex-start',
    backgroundColor: color.accent,
    borderRadius: radius.md,
    paddingHorizontal: space[20],
    paddingVertical: space[12],
  },
  buttonLabel: {
    ...typography.label,
    color: color.accentOnAccent,
  },
});
