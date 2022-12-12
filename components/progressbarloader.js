import React from "react";
import { Modal, Text, View, ActivityIndicator, Dimensions } from "react-native";
import { Colors, Default, Fonts } from "../constants/style";
import { useTranslation } from "react-i18next";
import * as Progress from 'react-native-progress';
const { width } = Dimensions.get("window");

const ProgressBarLoader = (props) => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`loader:${key}`);
  }

  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.transparentBlack,
        }}
      >
        <View
          style={{
            width: width / 1.5,
            backgroundColor: "white",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            ...Default.shadow,
            paddingVertical: Default.fixPadding * 2,
          }}
        >
          <Progress.Bar progress={props.progress} width={width / 1.8} />
          <Text
            style={{
              ...Fonts.SemiBold16Primary,
              marginTop: Default.fixPadding,
            }}
          >
            Uploading
          </Text>
        </View>
      </View>
    </Modal>
  );
};
export default ProgressBarLoader;
