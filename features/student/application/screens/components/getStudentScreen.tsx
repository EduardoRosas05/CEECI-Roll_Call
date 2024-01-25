import React, { useEffect, useState } from "react";
import Student from "../../../domain/entities/student";
import RollList from "../../../domain/entities/rollList";
import { View, StyleSheet, Text, Alert } from "react-native";
import Checkbox from 'expo-checkbox';
import { useAddRollListState } from "../../providers/addRollListProvider";
import { StudentProvider, useStudentState } from "../../providers/getStudentProvider";


type CardProps = {
    rolllist: RollList,
}

const StudentCard: React.FC<CardProps> = ({
    rolllist,
}) => {


    return(
        
        <View style={styles.container1}>
            <Text style={styles.cell}> {rolllist.fullName}</Text>

        
            <Text style={styles.cell}> {rolllist.date}</Text>
         
            
            <View style={styles.cell}>  
                <Checkbox
                value = {rolllist.attendance}
                onValueChange = { ( ) => {

                }}
            />      
            </View>
        </View>
    );
};

const StudentList = (props: CardProps) => (
  <StudentProvider> 
    <StudentCard {...props}/>
  </StudentProvider>
)

export default StudentList;

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