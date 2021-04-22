import React, {useState} from 'react';
import {Text, View, StyleSheet, Vibration, Platform} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Countdown from '../components/Countdown';
import RoundedButton from '../components/RoundedButton';
import {spacing} from '../utils/Sizes';
import Timing from './Timing';

const DEFAULT_TIME = 0.1;

const Timer = ({focusSubject, onTimerEnd, clearSubject}) => {
  //TODO:
  // install keep awake dependency
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarting, setIsStarting] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = progress => {
    setProgress(progress);
  };

  const vibrate = () => {
    //NTOE:
    //dili pa mu gana ang ios kay wala koy pang test
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 5000);
      setTimeout(() => clearInterval(interval), 5000);
    } else {
      Vibration.vibrate(5000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarting(false);
    onTimerEnd();
  };

  const changeTime = min => {
    setMinutes(min);
    setProgress(1);
    setIsStarting(false);
    console.log(min);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarting}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{paddingTop: spacing.xxl}}>
        <Text style={styles.title}>Focusing On:</Text>
        <Text style={styles.subject}>{focusSubject}</Text>
      </View>
      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar color="#00564d" style={{height: 10}} progress={progress} />
      </View>
      <View style={styles.buttonsWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonsWrapper}>
        {isStarting ? (
          <RoundedButton title="pause" onPress={() => setIsStarting(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarting(true)} />
        )}
      </View>
      <View style={styles.clearSubjectButton}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  subject: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsWrapper: {
    flex: 0.3,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearSubjectButton: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});

export default Timer;
