import { AppText } from '@/components/ui';
import { colors, fonts } from '@/constants';
import { RootState } from '@/redux/store';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const dummySoccerCourtsData = [
  {
    id: 1,
    name: "Stadio Soccer",
    distance: "3 mi away",
    city: "Miami",
    price: "4 fields, $80 - 200",
    rating: "4.5",
    reviews: 6,
    operateTime: "8-9pm",
    image: require('@/assets/card.png'),
  },
  {
    id: 2,
    name: "Tour Field Miami",
    distance: "12 mi away",
    city: "Miami",
    price: "2 fields, $80 - 200",
    rating: "4.5",
    reviews: 6,
    operateTime: "8-9pm",
    image: require('@/assets/card2.png'),
  },
  {
    id: 3,
    name: "Miami One Indoor",
    distance: "10 mi away",
    city: "Miami",
    price: "5 fields, $80 - 200",
    rating: "4.0",
    reviews: 10,
    operateTime: "11-12pm",
    image: require('@/assets/card3.png'),
  },
];

const dummyOpenPlayData = [
  {
    id: 1,
    name: "Stadio Soccer",
    operateTime: "4-5pm",
    type: "9v9",
    field: "North Field",
    status: "11/18",
    image: require('@/assets/OpenPlay/1.png'),
  },
  {
    id: 2,
    name: "Futeca",
    operateTime: "6-7pm",
    type: "5v5",
    field: "Back Field",
    status: "3/10",
    image: require('@/assets/OpenPlay/2.png'),
  },
  {
    id: 3,
    name: "Gales Stadium",
    operateTime: "6-7pm",
    type: "11v11",
    field: "Main Field",
    status: "11/12",
    image: require('@/assets/OpenPlay/3.png'),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { isAuthenticated, userData } = useSelector((state: RootState) => state.userReducer);
  const [selectedTab, setSelectedTab] = useState("Book a field");
  const [selectedDate, setSelectedDate] = useState<{date: number, dayName: string, month: number, year: number} | null>(null);
  const [remaining, setRemaining] = useState<{date: number, dayName: string, month: number, year: number}[]>([]);
  const insets = useSafeAreaInsets();
  const barHeight = Platform.OS === "android" ? StatusBar.currentHeight : insets.top;

  // GET ALL THE REMAINING DATES OF THE MONTH
  useEffect(() => {
    const remainingDatesAndDays = getRemainingDatesAndDays();
    setRemaining(remainingDatesAndDays);
  }, []);

  function getRemainingDatesAndDays() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

    const remainingDatesAndDays = [];

    for (let day = currentDay; day <= lastDayOfMonth; day++) {
      const date = new Date(currentYear, currentMonth - 1, day);
      remainingDatesAndDays.push({
        date: day,
        dayName: date.toLocaleString("en-US", { weekday: "long" }),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }

    setSelectedDate(remainingDatesAndDays[0]);
    return remainingDatesAndDays;
  }

  // If not authenticated, redirect to welcome screen
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/welcome');
    }
  }, [isAuthenticated]);

  // Show loading or empty state while redirecting
  if (!isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <AppText>Loading...</AppText>
      </View>
    );
  }

  // Authenticated user home screen - matching old app layout
  return (
    <View style={[styles.homeContainer, { width, paddingTop: barHeight, backgroundColor: colors.light }]}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      
      {/* USER, LOCATION AND NOTIFICATIONS */}
      <View style={styles.headerSection}>
        <View style={styles.userLocationContainer}>
          <View style={styles.userGreeting}>
            <AppText style={styles.helloText}>Hello,</AppText>
            <AppText style={styles.userName}>{userData?.firstName || 'Player'}</AppText>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color={colors.secondary} />
            <AppText style={styles.locationText}>Miami, FL</AppText>
          </View>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      {/* TABS */}
      <View style={styles.tabsContainer}>
        <FlatList
          data={["Book a field", "Open Play", "Join Matches"]}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tabButton,
                selectedTab === item && styles.selectedTab
              ]}
              onPress={() => setSelectedTab(item)}
            >
              <AppText style={selectedTab === item ? styles.selectedTabText : styles.tabText}>
                {item}
              </AppText>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>

      {/* DATE PICKER */}
      {selectedTab === "Book a field" && (
        <View style={styles.datePickerContainer}>
          <FlatList
            data={remaining}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dateButton,
                  selectedDate?.date === item.date && styles.selectedDateButton
                ]}
                onPress={() => setSelectedDate(item)}
              >
                <AppText style={selectedDate?.date === item.date ? styles.selectedDateText : styles.dateText}>
                  {item.date}
                </AppText>
                <AppText style={selectedDate?.date === item.date ? styles.selectedDayText : styles.dayText}>
                  {item.dayName.substring(0, 3)}
                </AppText>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => `${item.date}-${item.month}`}
          />
        </View>
      )}

      {/* CONTENT */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {selectedTab === "Book a field" && (
          <FlatList
            data={dummySoccerCourtsData}
            renderItem={({ item }) => (
              <View style={styles.facilityCard}>
                <Image source={item.image} style={styles.facilityImage} />
                <View style={styles.facilityInfo}>
                  <AppText style={styles.facilityName}>{item.name}</AppText>
                  <AppText style={styles.facilityLocation}>{item.distance} • {item.city}</AppText>
                  <AppText style={styles.facilityPrice}>{item.price}</AppText>
                  <View style={styles.facilityRating}>
                    <AntDesign name="star" size={14} color={colors.star} />
                    <AppText style={styles.ratingText}>{item.rating} ({item.reviews} reviews)</AppText>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}

        {selectedTab === "Open Play" && (
          <FlatList
            data={dummyOpenPlayData}
            renderItem={({ item }) => (
              <View style={styles.openPlayCard}>
                <Image source={item.image} style={styles.openPlayImage} />
                <View style={styles.openPlayInfo}>
                  <AppText style={styles.openPlayName}>{item.name}</AppText>
                  <AppText style={styles.openPlayTime}>{item.operateTime} • {item.type}</AppText>
                  <AppText style={styles.openPlayField}>{item.field}</AppText>
                  <View style={styles.openPlayStatus}>
                    <AppText style={styles.statusText}>{item.status}</AppText>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}

        {selectedTab === "Join Matches" && (
          <View style={styles.emptyState}>
            <AppText style={styles.emptyStateText}>No matches available right now</AppText>
            <AppText style={styles.emptyStateSubtext}>Check back later for new matches</AppText>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  // Authenticated Home Screen Styles
  homeContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userLocationContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  userGreeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  helloText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.secondary,
  },
  userName: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  locationText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary,
  },
  notificationButton: {
    padding: 10,
  },
  tabsContainer: {
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 15,
    borderRadius: 20,
    backgroundColor: colors.secondaryTenPercent,
  },
  selectedTab: {
    backgroundColor: colors.lime,
  },
  tabText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondary,
  },
  selectedTabText: {
    color: colors.primary,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  dateButton: {
    alignItems: 'center',
    padding: 15,
    marginRight: 15,
    borderRadius: 12,
    backgroundColor: colors.white,
    minWidth: 60,
  },
  selectedDateButton: {
    backgroundColor: colors.lime,
  },
  dateText: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.primary,
  },
  selectedDateText: {
    color: colors.primary,
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  dayText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.secondary,
    marginTop: 5,
  },
  selectedDayText: {
    color: colors.primary,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
  },
  facilityCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  facilityImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 15,
  },
  facilityInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  facilityName: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary,
  },
  facilityLocation: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary,
    marginTop: 5,
  },
  facilityPrice: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary,
    marginTop: 5,
  },
  facilityRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },
  ratingText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.secondary,
  },
  openPlayCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  openPlayImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 15,
  },
  openPlayInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  openPlayName: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary,
  },
  openPlayTime: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary,
    marginTop: 5,
  },
  openPlayField: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.primary,
    marginTop: 5,
  },
  openPlayStatus: {
    alignSelf: 'flex-start',
    backgroundColor: colors.lime,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 5,
  },
  statusText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    color: colors.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 10,
  },
});
