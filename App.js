import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import Timer from './src/features/Timer';
import Focus from './src/features/Focus';
import FocusHistory from './src/features/FocusHistory';

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2,
};

const App = () => {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error);
    }
  };
  const loadFocustHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFocustHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      {key: String(focusHistory.length + 1), subject, status},
    ]);
  };

  console.log(focusHistory);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistoryWithStatus(focusSubject, STATUSES.COMPLETED);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistoryWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00897b',
  },
});

export default App;
