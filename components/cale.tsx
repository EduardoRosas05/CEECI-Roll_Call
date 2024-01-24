import React, { useState } from "react";
import { Modal, StyleSheet, View, Text, Button } from "react-native";
import { Calendar } from "react-native-calendars";

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  setSelectedDate: (date: Date) => void;
}

const Calen: React.FC<CalendarModalProps> = ({ visible, onClose, setSelectedDate  }) => {

  const [selectedDate] = useState<string | undefined>();

  const onDayPress = (day: any) => {
    setSelectedDate(new Date(day.dateString));
    console.log(selectedDate);
    onClose();
  };

  return (
    <View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
          />
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal> 
  </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default Calen;

