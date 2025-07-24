import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from "react-native-webview";

type Props = {
	visible: boolean;
	onClose: () => void;
	url: string;
}

const WebModal = ({ visible, onClose, url }: Props) => {
  return (
    <Modal 
      visible={visible}
      animationType="slide"
			transparent={true}
			onRequestClose={onClose}
    >

      <View style={styles.modalOverflow}>
        <View style={styles.container}>
          <WebView
          source={{ uri: url }}
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
        />

        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={styles.buttonLabel}>Fechar</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverflow: {
    flex: 1,
    backgroundColor: "#000b",
    justifyContent: "flex-end"
  },
  container: {
    height: "80%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 6,
    borderColor: "white",
    overflow: "hidden"
  },
  button: {
    margin: 18,
    backgroundColor: "#e70606",
    padding: 12,
    borderRadius: 10,
  },
  buttonLabel: {
    color: "white",
    fontSize: 24,
    textAlign: "center"
  },
});

export default WebModal;
