import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View, SafeAreaView, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import { format } from 'date-fns';

interface CalendarModalProps {
  visible: boolean;
  onClose: () => void;
  setSelectedDate: (date: Date) => void;
}

const Calen: React.FC<CalendarModalProps> = ({ visible, onClose, setSelectedDate }) => {

  const [selectedDate, setSelectedDateState] = useState<Date | undefined>();

  const handleDateSelect = (selectedDate: any) => {
    if (selectedDate && selectedDate.dateString) {
      setSelectedDateState(new Date(selectedDate.dateString));
      setSelectedDate(new Date(selectedDate.dateString));
      console.log('Efecto de fecha seleccionada en modal:', selectedDate.dateString)
    } else {
      setSelectedDateState(undefined);
      setSelectedDateState(undefined);
    }
    onClose();
  };

  const handleClose = () => {
    onClose();  // Cierra el modal después de seleccionar una fecha
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={selectedDate ? { [selectedDate.toISOString()]: { selected: true } } : {}}
          />
          <Button title="Cerrar" onPress={handleClose} />
        </View>
      </View>
    </Modal>
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

