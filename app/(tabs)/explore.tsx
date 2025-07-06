import { colors, fonts, fontSizes, spacing } from '@/constants';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Discover courts and matches near you</Text>
        </View>

        {/* Search Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search</Text>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Search bar will be here</Text>
          </View>
        </View>

        {/* Sports Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sports</Text>
          <View style={styles.categoriesGrid}>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>⚽ Soccer</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>🏀 Basketball</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>🎾 Tennis</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>🏐 Volleyball</Text>
            </View>
          </View>
        </View>

        {/* Nearby Facilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Facilities</Text>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Map and facility list will appear here</Text>
          </View>
        </View>

        {/* Open Matches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Open Matches</Text>
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Available matches you can join</Text>
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
  title: {
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  categoryCard: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: '45%',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: fontSizes.md,
    fontFamily: fonts.semibold,
    color: colors.primary,
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
