import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { colors } from '../../../constants/Colors';
import { fonts } from '../../../constants/Fonts';
import { AppText } from '../AppText';

interface Place {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface GooglePlacesInputProps {
  placeholder?: string;
  value?: string;
  onPlaceSelected: (place: Place) => void;
  onChangeText?: (text: string) => void;
  style?: any;
  error?: boolean;
}

const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

export const GooglePlacesInput: React.FC<GooglePlacesInputProps> = ({
  placeholder = 'Search for a city...',
  value = '',
  onPlaceSelected,
  onChangeText,
  style,
  error = false,
}) => {
  const [query, setQuery] = useState(value);
  const [predictions, setPredictions] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);
  const [justSelected, setJustSelected] = useState(false);

  // Debounce function to limit API calls
  const debounce = (func: Function, wait: number) => {
    let timeout: any;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Function to search places
  const searchPlaces = async (searchQuery: string) => {
    // Don't search if user just selected a place
    if (justSelected) {
      setJustSelected(false);
      return;
    }

    if (!searchQuery.trim() || searchQuery.length < 2) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          searchQuery
        )}&types=(cities)&language=en&key=${GOOGLE_PLACES_API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.status === 'OK' && data.predictions) {
        setPredictions(data.predictions);
        setShowPredictions(true);
      } else {
        setPredictions([]);
        setShowPredictions(false);
        if (data.status === 'REQUEST_DENIED') {
          console.error('Google Places API request denied:', data.error_message);
        }
      }
    } catch (error) {
      console.error('Error fetching places:', error);
      setPredictions([]);
      setShowPredictions(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce(searchPlaces, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  const handleTextChange = (text: string) => {
    setQuery(text);
    setJustSelected(false); // Reset the flag when user types
    onChangeText?.(text);
  };

  const handlePlaceSelect = (place: Place) => {
    setJustSelected(true); // Set flag to prevent immediate search
    setQuery(place.description);
    setShowPredictions(false);
    setPredictions([]);
    onPlaceSelected(place);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.secondary}
          value={query}
          onChangeText={handleTextChange}
          onFocus={() => {
            if (predictions.length > 0) {
              setShowPredictions(true);
            }
          }}
        />
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={colors.secondary}
            style={styles.loader}
          />
        )}
      </View>

      {showPredictions && predictions.length > 0 && (
        <View style={styles.predictionsContainer}>
          <View style={styles.predictionsList}>
            {predictions.map((item, index) => (
              <TouchableOpacity
                key={item.place_id}
                style={[
                  styles.predictionItem,
                  index === predictions.length - 1 && styles.lastPredictionItem
                ]}
                onPress={() => handlePlaceSelect(item)}
              >
                <AppText style={styles.mainText}>
                  {item.structured_formatting.main_text}
                </AppText>
                <AppText style={styles.secondaryText}>
                  {item.structured_formatting.secondary_text}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginLeft: 20,
    marginTop: 15,
  },
  inputContainer: {
    height: 67,
    borderRadius: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderColor: colors.secondaryThirtyPercent,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputError: {
    borderColor: colors.red,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.primary,
  },
  loader: {
    marginLeft: 10,
  },
  predictionsContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginTop: 5,
    maxHeight: 200,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: colors.secondaryTenPercent,
  },
  predictionsList: {
    borderRadius: 16,
  },
  predictionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryTenPercent,
  },
  mainText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: colors.primary,
    marginBottom: 2,
  },
  secondaryText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.secondary,
  },
  lastPredictionItem: {
    borderBottomWidth: 0,
  },
}); 