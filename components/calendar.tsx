import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { es } from 'date-fns/locale';

interface CalendarProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ visible, onClose, onDateSelect }) => {
 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedDate(selectedDate);
      onDateSelect(selectedDate);

      const formattedDate = selectedDate.toISOString().split('T')[0];
      console.log(formattedDate);
    }
  };

  useEffect(() => {
    setShowDatePicker(true);
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              locale={es as any}
            />
          )}
          <Button title="Cerrar" onPress={onClose} />
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
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Calendar;
