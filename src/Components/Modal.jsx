import React, {useState,useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import styles from './styles/Modal.styles';

const ModalComp = ({modalPopUp,title, modalText, setModal}) => {
  const [visible, setVisible] = useState(modalPopUp);
  
  
  useEffect(() => { 
    setVisible(modalPopUp);
  }, [modalPopUp]);
  

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPopUp}
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>{modalText}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModal(false)}>
              <Text style={styles.textStyle}>   OK   </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};


export default ModalComp;