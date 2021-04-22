import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {fontSize, spacing} from '../utils/Sizes';

const minutesToMilis = min => min * 1000 * 60;
const formatTime = time => (time < 10 ? `0${time}` : time);

const Countdown = ({minutes, isPaused = true, onProgress, onEnd}) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(minutesToMilis(null));

  const countDown = () => {
    setMillis(time => {
      if (time === 0) {
        //stop counting
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  //if new minutes is passed activate setMillis
  useEffect(() => {
    setMillis(minutesToMilis(minutes));
  }, [minutes]);

  //
  useEffect(() => {
    onProgress(millis / minutesToMilis(minutes));
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      // clear references
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minute)} : {formatTime(seconds)}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    color: 'white',
    padding: spacing.lg,
    backgroundColor: '#00564d',
  },
});

export default Countdown;
