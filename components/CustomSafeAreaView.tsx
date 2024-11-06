import React, {CSSProperties, FC, ReactNode} from 'react';
import {SafeAreaView, View} from 'react-native';

type CustomSafeAreaViewProps = {
  children: ReactNode;
  style?: any;
};
const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({children, style}) => {
  return (
    <SafeAreaView style={[style, {flex: 1}]}>
      <View style={style ? style : {}}>{children}</View>
    </SafeAreaView>
  );
};

export default CustomSafeAreaView;
