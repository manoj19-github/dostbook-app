import {View, Text} from 'react-native';
import React, {FC} from 'react';

type DashboardScreenProps = {};

const DashboardScreen: FC<DashboardScreenProps> = (): JSX.Element => {
  return (
    <View>
      <Text>DashboardScreen</Text>
    </View>
  );
};

export default DashboardScreen;
