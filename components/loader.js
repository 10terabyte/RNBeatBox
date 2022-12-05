import React from "react";
import { Modal, Text, View, ActivityIndicator, Dimensions } from "react-native";
import { Colors, Default, Fonts } from "../constants/style";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const Loader = (props) => {
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
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text
            style={{
              ...Fonts.SemiBold16Primary,
              marginTop: Default.fixPadding,
            }}
          >
            {tr("pleaseWait")}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
export default Loader;
