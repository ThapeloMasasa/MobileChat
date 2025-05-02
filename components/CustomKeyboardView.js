import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React from 'react';

const ios = Platform.OS === 'ios';

export default function CustomKeyBoardView({ children, inChat }) {
  let kavConfig = {
    behavior: ios ? 'padding' : 'height',
    keyboardVerticalOffset: 0,
    style: { flex: 1 },
  };

  let scrollViewConfig = {
    style: { flex: 1 },
    contentContainerStyle: {},
    bounces: false,
    showsVerticalScrollIndicator: false,
  };

  if (inChat) {
    kavConfig.keyboardVerticalOffset = 90;
    scrollViewConfig.contentContainerStyle = { flex: 1 };
  }

  return (
    <KeyboardAvoidingView {...kavConfig}>
      <ScrollView {...scrollViewConfig}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
