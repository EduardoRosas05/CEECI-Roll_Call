import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, FlatList, TouchableOpacity} from "react-native";
import { IconButton } from 'react-native-paper';
import Checkbox from 'expo-checkbox';
import { useAddRollListState } from "../../providers/addRollListProvider";
import { StudentProvider, useStudentState } from "../../providers/getStudentProvider";
import Calen from "../../../../../components/cale";


const StudentListA = ({
}) => {

  const {
    loading, 
    saved, 
    success, 
    message,
    rollList,
    errors, 

    setRollListProp, 
    saveRollList
  } = useAddRollListState();

  const {
    students,

    getStudent
  } = useStudentState();

  const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(()=> {
    getStudent();
  }, [])


  const handleSaveList = async () => {
    try {
      await saveRollList();

    }catch (error: any) {
      console.error("Error al guardar al usuario:", error);
        console.log("Respuesta del servidor:", error.response);
  
        if (typeof error.response === 'string') {
          console.log("Respuesta del servidor (no JSON):", error.response);
        } else {
          throw error;
        }
      }
  }

  useEffect(() => {
    if (success && message) {
      Alert.alert('Usuario Registrado', message);
    } else if (!success && message) {
      Alert.alert('Error', message);
    }
  }, [success, message]);

  

    return(
        
      <View style={styles.container}>
         <View style={styles.buttonCon}>   
                <TouchableOpacity style={styles.buttonCo} onPress={() => setCalendarVisible(true)} >
                    <IconButton icon={"calendar"} size={50} iconColor="green"/> 
                        <Text style={styles.textStyleDate}>
                        {selectedDate.toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            timeZone: 'UTC'
                        })}
                        </Text>     
                </TouchableOpacity>
            </View>
      <View style={styles.header}>
        <Text style={styles.cell}>Nombre</Text>
        <Text style={styles.cell}>Matrícula</Text>
        <Text style={styles.cell}>Asistencia</Text>
      </View>
      
          {students.map((student) => (
            <View style={styles.row} key={student.key}>
            <Text style={styles.cellText}>{student.fullName}</Text>
            <Text style={styles.cellText}>{student.key}</Text>
            <View style={styles.cell}>
              <Checkbox
                onValueChange={() => {

                }}
              />
            </View>
          </View>
          ))}

<Calen
                visible={isCalendarVisible} 
                onClose={() => setCalendarVisible(false)}
                setSelectedDate={(date) => {
                    setSelectedDate(date);
                    setCalendarVisible(false);
                }}
            />
    </View>
  );
};

const AddStudentList = (props: any) => (
  <StudentProvider> 
    <StudentListA {...props}/>
  </StudentProvider>
)

export default AddStudentList;

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 7,
    marginTop: 5,
  },
  cell: {
    width: '32%', // Ajusta el ancho según sea necesario
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    textAlign: 'center',
    width: 100, // Ajusta el ancho según sea necesario
  },
  buttonCon:{
    flexDirection: 'row',
    justifyContent: 'center',
},
  buttonCo: {
    alignItems: 'center'
},
textStyleDate: {
  width: 'auto',
  fontSize: 16,
  textAlign: 'center'
},
});