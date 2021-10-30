import React from 'react';
import {
  Text,
  TextStyle,
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
} from 'react-native';
import {useTheme} from '@hooks/use-theme';
const TextWrapper: React.FC<{
  style?: TextStyle | TextStyle[];
  children: string | number | null | undefined;
}> = ({style, children}) => {
  const theme = useTheme();
  return <Text style={[{color: theme.primary100}, style]}>{children}</Text>;
};

const SubTextWrapper: React.FC<{
  style?: TextStyle;
  children: string | number | null | undefined;
}> = ({style, children}) => {
  const theme = useTheme();
  return (
    <Text
      style={[
        style,
        {color: theme.primary100, fontSize: 10, textAlign: 'right'},
      ]}>
      {children}
    </Text>
  );
};

const TextInputWrapper: React.FC<
  TextInputProps & {prefixIcon?: {(): JSX.Element}}
> = props => {
  const theme = useTheme();
  const PrefixIcon = props.prefixIcon;
  return (
    <View
      style={[
        {
          backgroundColor: theme.back,
        },
        styles.textInputWrapper,
      ]}>
      {PrefixIcon && <PrefixIcon />}
      <TextInput
        {...props}
        style={[
          styles.searchInput,
          {
            color: theme.primary100,
            backgroundColor: theme.back,
          },
          props.style,
        ]}
        selectionColor={theme.primary100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    height: 80,
    flexDirection: 'row',
  },
  searchInput: {
    height: 20,
    fontSize: 12,
    lineHeight: 20,
    paddingVertical: 0,
  },
  textInputWrapper: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#2B2936',
    borderRadius: 15,
    height: 35,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 5,
  },
});

export const AllText = {
  SubTextWrapper,
  TextInputWrapper,
};
export default TextWrapper;
