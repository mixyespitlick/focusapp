import React from 'react';
import {FlatList, SafeAreaView, Text, StyleSheet, View} from 'react-native';
import RoundedButton from '../components/RoundedButton';
import {fontSize as size, spacing} from '../utils/Sizes';

const renderHistoryItems = ({item, index}) => {
  return (
    <Text key={item.key} style={styles.historyItem(item.status)}>
      {item.subject}
    </Text>
  );
};

const FocusHistory = ({focusHistory, onClear}) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{flex: 0.5, alignItems: 'center'}}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we have focused on</Text>
            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{flex: 1, alignItems: 'center'}}
              data={focusHistory}
              renderItem={renderHistoryItems}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: status => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: size.md,
  }),
  title: {
    color: 'white',
    fontSize: size.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});

export default FocusHistory;
