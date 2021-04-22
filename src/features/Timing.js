import React from 'react';
import {StyleSheet, View} from 'react-native';
import RoundedButton from '../components/RoundedButton';

const Timing = ({onChangeTime}) => {
  return (
    <View style={styles.timingButtons}>
      <RoundedButton size={75} title="10" onPress={() => onChangeTime(10)} />
      <RoundedButton size={75} title="15" onPress={() => onChangeTime(15)} />
      <RoundedButton size={75} title="20" onPress={() => onChangeTime(20)} />
    </View>
  );
};

const styles = StyleSheet.create({
  timingButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Timing;
