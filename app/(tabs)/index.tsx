import { AppButton, AppText } from '@/components/ui';
import { borderRadius, colors, fontSizes, spacing } from '@/constants';
import { RootState } from '@/redux/store';
import { useRouter } from 'expo-router';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const quickActions = [
  { id: '1', title: 'Book Field', icon: '⚽', color: colors.lime },
  { id: '2', title: 'Join Match', icon: '🏆', color: colors.green },
  { id: '3', title: 'Find Friends', icon: '👥', color: colors.footer },
  { id: '4', title: 'My Profile', icon: '👤', color: colors.orange },
];

const popularFields = [
  { id: '1', name: 'Greenfields Sports Complex', location: 'Miami, FL', rating: 4.8, image: require('@/assets/Greenfields.png') },
  { id: '2', name: 'South Field Arena', location: 'Miami, FL', rating: 4.6, image: require('@/assets/SouthField.png') },
  { id: '3', name: 'SF Florida Stadium', location: 'Orlando, FL', rating: 4.9, image: require('@/assets/SFFlorida.png') },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated, userData } = useSelector((state: RootState) => state.userReducer);

  // If not authenticated, show welcome screen
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.welcomeContainer}>
            <Image 
              source={require('@/assets/banner.png')} 
              style={styles.welcomeImage}
              resizeMode="contain"
            />
            <AppText variant="heading" weight="bold" color={colors.primary} style={styles.welcomeTitle}>
              Welcome to Qick
            </AppText>
            <AppText variant="body" color={colors.secondary} style={styles.welcomeSubtitle}>
              Your ultimate sports companion for booking facilities, joining matches, and connecting with players
            </AppText>
            
            <View style={styles.authButtons}>
              <AppButton
                title="Get Started"
                onPress={() => router.push('/onboarding')}
                style={styles.primaryButton}
              />
              <AppButton
                title="I have an account"
                variant="outline"
                onPress={() => router.push('/auth/login')}
                style={styles.secondaryButton}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Authenticated user home screen
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <AppText variant="caption" color={colors.secondary}>
              Good morning,
            </AppText>
            <AppText variant="title" weight="bold" color={colors.primary}>
              {userData?.firstName || 'Player'}
            </AppText>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={userData?.avatar ? { uri: userData.avatar } : require('@/assets/profile.png')} 
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <AppText variant="subtitle" weight="semibold" color={colors.primary} style={styles.sectionTitle}>
            Quick Actions
          </AppText>
          <FlatList
            data={quickActions}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsList}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.quickAction, { backgroundColor: item.color + '20' }]}>
                <View style={[styles.quickActionIcon, { backgroundColor: item.color }]}>
                  <AppText variant="title" color={colors.white}>
                    {item.icon}
                  </AppText>
                </View>
                <AppText variant="caption" weight="medium" color={colors.primary} style={styles.quickActionTitle}>
                  {item.title}
                </AppText>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Popular Fields */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="subtitle" weight="semibold" color={colors.primary}>
              Popular Fields
            </AppText>
            <TouchableOpacity>
              <AppText variant="body" color={colors.lime}>
                See All
              </AppText>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={popularFields}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.fieldsList}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.fieldCard}>
                <Image source={item.image} style={styles.fieldImage} />
                <View style={styles.fieldInfo}>
                  <AppText variant="body" weight="semibold" color={colors.primary} numberOfLines={1}>
                    {item.name}
                  </AppText>
                  <AppText variant="caption" color={colors.secondary}>
                    {item.location}
                  </AppText>
                  <View style={styles.rating}>
                    <AppText variant="caption" color={colors.orange}>
                      ⭐ {item.rating}
                    </AppText>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <AppText variant="subtitle" weight="semibold" color={colors.primary} style={styles.sectionTitle}>
            Recent Activity
          </AppText>
          <View style={styles.activityCard}>
            <AppText variant="body" color={colors.secondary}>
              No recent activity. Start by booking a field or joining a match!
            </AppText>
            <AppButton
              title="Book Now"
              size="small"
              style={styles.bookButton}
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  
  // Welcome Screen Styles
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  welcomeImage: {
    width: '100%',
    height: 250,
    marginBottom: spacing.xl,
  },
  welcomeTitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  welcomeSubtitle: {
    textAlign: 'center',
    marginBottom: spacing.xxl,
    lineHeight: 24,
  },
  authButtons: {
    width: '100%',
    gap: spacing.md,
  },
  primaryButton: {
    marginBottom: spacing.xs,
  },
  secondaryButton: {
    borderColor: colors.lime,
  },

  // Authenticated Home Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  quickActionsList: {
    paddingRight: spacing.lg,
  },
  quickAction: {
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginRight: spacing.md,
    width: 80,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    textAlign: 'center',
    fontSize: fontSizes.xs,
  },
  fieldsList: {
    paddingRight: spacing.lg,
  },
  fieldCard: {
    width: 200,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
  },
  fieldInfo: {
    padding: spacing.md,
  },
  rating: {
    marginTop: spacing.xs,
  },
  activityCard: {
    backgroundColor: colors.lightEventsBg,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  bookButton: {
    marginTop: spacing.md,
  },
});
