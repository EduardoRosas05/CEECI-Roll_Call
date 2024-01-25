import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, FlatList} from "react-native";
import Checkbox from 'expo-checkbox';
import { useAddRollListState } from "../../providers/addRollListProvider";
import { StudentProvider, useStudentState } from "../../providers/getStudentProvider";


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
});