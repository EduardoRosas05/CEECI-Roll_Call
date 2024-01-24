import React, { useState } from "react";
import RollList from "../../../domain/entities/rollList";
import { View, StyleSheet, Text } from "react-native";
import Checkbox from 'expo-checkbox';


type CardProps = {
    rollList: RollList,
}

const StudentRollList: React.FC<CardProps> = ({
    rollList,
}) => {
    return(
        <Checkbox
        
        >
        </Checkbox>
    );
};
export default StudentRollList;

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
        maxWidth: '25%'
      }
    });