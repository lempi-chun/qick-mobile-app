/**
 * LanguageSelector - Global reusable component for language selection
 * 
 * This modal component can be used across the entire app to allow users to select their language.
 * It uses the 'common' translation namespace to ensure it works from any page.
 * 
 * Usage:
 * import { LanguageSelector } from '@/components';
 * 
 * <LanguageSelector visible={showModal} onClose={() => setShowModal(false)} />
 */

import { colors, fonts } from '@/constants';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import i18n from 'i18next';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from './ui';

const { height: screenHeight } = Dimensions.get('window');

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
}

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  visible,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('common');
  const slideAnim = useRef(new Animated.Value(300)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const currentLanguage = i18n.language;
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  // Update selected language when modal opens
  useEffect(() => {
    if (visible) {
      setSelectedLanguage(currentLanguage);
    }
  }, [visible, currentLanguage]);

  useEffect(() => {
    if (visible) {
      // Slide up animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide down animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleDone = () => {
    // Only change language when Done is clicked
    if (selectedLanguage !== currentLanguage) {
      i18n.changeLanguage(selectedLanguage);
    }
    onClose();
  };

  const handleBackdropPress = () => {
    // Reset to current language if user dismisses without clicking Done
    setSelectedLanguage(currentLanguage);
    onClose();
  };

  const handleClosePress = () => {
    // Reset to current language if user clicks close without clicking Done
    setSelectedLanguage(currentLanguage);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View 
            style={[
              styles.backdrop,
              {
                opacity: backdropAnim,
              }
            ]} 
          />
        </TouchableWithoutFeedback>

        {/* Modal Content */}
        <Animated.View
          style={[
            styles.modalContent,
            {
              paddingBottom: insets.bottom + 20,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <AppText style={styles.title}>{t('language.chooseLanguage')}</AppText>
            <TouchableOpacity onPress={handleClosePress} style={styles.closeButton}>
              <AntDesign name="close" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Language Options */}
          <View style={styles.languageList}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={styles.languageOption}
                onPress={() => handleLanguageSelect(language.code)}
              >
                <AppText style={styles.languageName}>{language.nativeName}</AppText>
                <View style={styles.radioButton}>
                  {selectedLanguage === language.code ? (
                    <View style={styles.radioSelected}>
                      <Ionicons name="checkmark" size={16} color={colors.white} />
                    </View>
                  ) : (
                    <View style={styles.radioUnselected} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <AppText style={styles.doneButtonText}>{t('button.done')}</AppText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 350,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.primary,
    lineHeight: 35,
  },
  closeButton: {
    padding: 4,
  },
  languageList: {
    flex: 1,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  languageName: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: colors.primary,
  },
  radioButton: {
    width: 24,
    height: 24,
  },
  radioSelected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.clock,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioUnselected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.secondaryTenPercent,
    backgroundColor: colors.white,
  },
  doneButton: {
    backgroundColor: colors.lime,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
}); 