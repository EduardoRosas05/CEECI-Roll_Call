import React, { useState } from "react";
import Student from "../../../domain/entities/student";
import { View, StyleSheet, Text } from "react-native";
import Checkbox from 'expo-checkbox';

type CardProps = {
    student: Student,
}

const StudentCard: React.FC<CardProps> = ({
    student,
}) => {

    return(
        
        <View style={styles.container1}>
            <Text style={styles.cell}> {student.fullName} </Text>
            <Text style={styles.cell}>{student.key}</Text>
            <Checkbox style={styles.checkbox}/>
        </View>
    );
};
export default StudentCard;

const styles =  StyleSheet.create({
    container1: {
        flexDirection: 'row', // Muestra los elementos en una sola línea
        justifyContent: 'space-between', // Distribuye los elementos equitativamente a lo largo del contenedor
        
    },
    cell: {
        alignContent:'flex-start'
    },
    alumnos:{
    marginTop: 100,
    marginBottom: 100,
    },
    checkbox:{

    }

})