import { colors, fonts, fontSizes, spacing } from '@/constants';
import { RootState } from '@/redux/store';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const { isAuthenticated, userData } = useSelector((state: RootState) => state.userReducer);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            {isAuthenticated ? `Welcome back, ${userData?.name || 'Player'}!` : 'Welcome to Qick'}
          </Text>
          <Text style={styles.subtitle}>Find and book your next game</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <View style={styles.actionCard}>
              <Text style={styles.actionTitle}>Find Fields</Text>
              <Text style={styles.actionSubtitle}>Book nearby courts</Text>
            </View>
            <View style={styles.actionCard}>
              <Text style={styles.actionTitle}>Join Matches</Text>
              <Text style={styles.actionSubtitle}>Find open games</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              {isAuthenticated ? 'Your recent bookings will appear here' : 'Sign in to see your activity'}
            </Text>
          </View>
        </View>

        {/* Popular Fields */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Fields</Text>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Featured courts and facilities</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  welcomeText: {
    fontSize: fontSizes.heading,
    fontFamily: fonts.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSizes.md,
    fontFamily: fonts.regular,
    color: colors.secondary,
  },
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.semibold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.semibold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  actionSubtitle: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.secondary,
  },
  placeholder: {
    backgroundColor: colors.lightEventsBg,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  placeholderText: {
    fontSize: fontSizes.md,
    fontFamily: fonts.regular,
    color: colors.secondary,
    textAlign: 'center',
  },
});
