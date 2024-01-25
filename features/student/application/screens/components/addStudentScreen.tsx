import React, { useEffect, useState } from "react";
import Student from "../../../domain/entities/student";
import RollList from "../../../domain/entities/rollList";
import { View, StyleSheet, Text, Alert } from "react-native";
import Checkbox from 'expo-checkbox';
import { useAddRollListState } from "../../providers/addRollListProvider";
import { StudentProvider, useStudentState } from "../../providers/getStudentProvider";


const AddStudentCard = ({
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
        
        <View style={styles.container1}>
          {students.map((student) => (
            <Text style={styles.cell}> {student.fullName}</Text>
          ))}
          
          {students.map((student) => (
            <Text style={styles.cell}> {student.key}</Text>
          ))} 
            
            <View style={styles.cell}>  
                <Checkbox
                value = {rollList.attendance}
                onValueChange = { ( ) => {

                }}
            />      
            </View>
        </View>
    );
};

const StudentListA = (props: any) => (
  <StudentProvider> 
    <AddStudentCard {...props}/>
  </StudentProvider>
)

export default StudentListA;

const styles =  StyleSheet.create({
    container1: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1, // Agrega un borde inferior para separar las filas
        borderColor: '#ccc', // Color del borde
        paddingVertical: 7, // Espaciado vertical
      },
      cell: {
        textAlign: 'center', // Centra el texto horizontalmente
        flex: 1, // Hace que los elementos ocupen el mismo ancho
        alignItems: 'center'
      },
      cell1: {
        textAlign: 'center', // Centra el texto horizontalmente
        marginRight: '3%',
        maxWidth: '25%',
      }
    });