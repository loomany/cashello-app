import { useEffect, useState, type ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { color, radius, space, typography } from '@/design/tokens';
import { prototypeBuild } from '@/prototype/config';
import { getScreenMeta } from '@/prototype/metadata/registry';
import { useMockStore } from '@/state/store';

type Props = {
  route: string;
  children: ReactNode;
  extra?: ReactNode;
};

/**
 * Developer secret overlay host.
 *
 * Hotspot must NOT sit on top-left (legacy ←) or top-right (Home messages/profile,
 * Search Cancel, History/Messages «Фильтр», sheet Close). Mid-left edge avoids
 * those chrome zones; bottom is often a full-width CTA.
 */
export const DEBUG_HOTSPOT_LAYOUT = {
  width: 28,
  height: 48,
  left: 0,
  /** Vertical center of the screen (RN % + translate). */
  topPercent: '50%' as const,
  marginTop: -24,
  zIndex: 20,
} as const;

export function DebugMetaHost({ route, children, extra }: Props) {
  const [open, setOpen] = useState(false);
  const [taps, setTaps] = useState(0);
  const resetToCanonical = useMockStore((state) => state.resetToCanonical);
  const meta = getScreenMeta(route);

  useEffect(() => {
    if (taps === 0) return;
    const timer = setTimeout(() => setTaps(0), 700);
    return () => clearTimeout(timer);
  }, [taps]);

  const onSecretTap = () => {
    const next = taps + 1;
    if (next >= 3) {
      setOpen(true);
      setTaps(0);
      return;
    }
    setTaps(next);
  };

  return (
    <View style={styles.host} pointerEvents="box-none">
      {children}
      <Pressable
        accessibilityLabel="Open prototype metadata"
        accessibilityRole="button"
        onPress={onSecretTap}
        style={styles.hotspot}
      />
      <Modal animationType="fade" transparent visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.panel} onPress={() => undefined}>
            <Text style={styles.kicker}>Developer metadata</Text>
            <Text style={styles.line}>Screen: {meta?.screenId ?? 'none (not a product SCR)'}</Text>
            <Text style={styles.line}>Name: {meta?.screenName ?? '—'}</Text>
            <Text style={styles.line}>Route: {meta?.route ?? route}</Text>
            <Text style={styles.line}>Task: {meta?.taskId ?? prototypeBuild.taskId}</Text>
            <Text style={styles.line}>Checkpoint: {prototypeBuild.checkpointId}</Text>
            <Text style={styles.line}>Status: {meta?.prototypeStatus ?? 'foundation'}</Text>
            <Text style={styles.line}>Legacy node: {meta?.legacyNodeId ?? '—'}</Text>
            <Text style={styles.line}>Mock money: yes · Real backend: no</Text>
            {extra}
            <View style={styles.row}>
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  resetToCanonical();
                  setOpen(false);
                }}
                style={styles.action}
              >
                <Text style={styles.actionLabel}>Reset demo</Text>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={() => setOpen(false)} style={styles.ghost}>
                <Text style={styles.ghostLabel}>Close</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  host: { flex: 1 },
  hotspot: {
    position: 'absolute',
    left: DEBUG_HOTSPOT_LAYOUT.left,
    top: DEBUG_HOTSPOT_LAYOUT.topPercent,
    marginTop: DEBUG_HOTSPOT_LAYOUT.marginTop,
    width: DEBUG_HOTSPOT_LAYOUT.width,
    height: DEBUG_HOTSPOT_LAYOUT.height,
    zIndex: DEBUG_HOTSPOT_LAYOUT.zIndex,
  },
  overlay: {
    flex: 1,
    backgroundColor: color.overlay,
    justifyContent: 'center',
    padding: space[24],
  },
  panel: {
    backgroundColor: color.elevated,
    borderRadius: radius.lg,
    padding: space[20],
    gap: space[8],
  },
  kicker: {
    ...typography.label,
    color: color.textTertiary,
    textTransform: 'uppercase',
    marginBottom: space[8],
  },
  line: {
    ...typography.body,
    color: color.textPrimary,
  },
  row: {
    flexDirection: 'row',
    gap: space[12],
    marginTop: space[12],
  },
  action: {
    backgroundColor: color.accent,
    borderRadius: radius.md,
    paddingHorizontal: space[16],
    paddingVertical: space[12],
  },
  actionLabel: {
    ...typography.label,
    color: color.accentOnAccent,
  },
  ghost: {
    borderRadius: radius.md,
    paddingHorizontal: space[16],
    paddingVertical: space[12],
  },
  ghostLabel: {
    ...typography.label,
    color: color.textSecondary,
  },
});
