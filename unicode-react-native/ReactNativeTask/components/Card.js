import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    shadowColor: Colors.secondary,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    marginVertical: 10,
  }
});

export default Card;
