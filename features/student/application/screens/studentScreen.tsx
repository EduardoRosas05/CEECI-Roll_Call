import React, { useEffect, useState } from "react";
import Student from "../../domain/entities/student";
import StudentCard from "./components/getStudentScreen";
import { StudentProvider, useStudentState } from "../providers/getStudentProvider";
import { FlatList, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { IconButton } from 'react-native-paper';
import Calendar from "../../../../components/calendar";
import Calen from "../../../../components/cale";

const StudentScreenView = () => {

    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const {
        students,
        loading,

        getStudent
    } = useStudentState();

    const renderCards = () => {
        if (students == null){
            return null;
        }
        
        return (
            <FlatList
                data={students}
                renderItem={({item}) => (
                    <StudentCard
                        student={item}
                    />
                )}
            />
        );
    };

    useEffect(()=>{
        getStudent();
    }, []);

    useEffect(()=>{
        console.log('Students:', students);
    }, [students]);

    return (
        <View >
            
            <View style={styles.head}>
                <Text style={styles.textStyle}> Estudiantes :3</Text>
            </View>

            <View style={styles.buttonCon}>
                <TouchableOpacity style={styles.buttonCo} onPress={() => setCalendarVisible(true)} >
                    <IconButton icon={"calendar"} size={50} iconColor="green"/>
                    <Text style={styles.textStyle}>
                        {selectedDate.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container1}>
                <Text style={styles.cell}>Nombre</Text>
                <Text style={styles.cell}>Matricula</Text>
                <Text style={styles.cell}>Asistencia</Text>
            </View>
            <View style={styles.list}>
                {renderCards()}
            </View>
            <View>
            <Calen 
                visible={isCalendarVisible} 
                onClose={() => setCalendarVisible(false)}
                setSelectedDate={(date) => {
                    setSelectedDate(date);
                    setCalendarVisible(false);
                }}
            />
            </View>
            <View>
            </View>
        </View>
    );
}
const StudentScreen = (props: any) => (
    <StudentProvider>
        <StudentScreenView {...props} />
    </StudentProvider>
)

const styles = StyleSheet.create({
    list: {
        marginLeft: '5%',
        marginRight: '5%'
    },
    head: {
        marginTop: 250,
        fontSize: 16
    },
    buttonCon:{
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonCo: {
        alignItems: 'center'
    },
    textStyle: {
        width: 'auto',
        fontSize: 16,
        textAlign: 'center'
    },
    container1: {
        marginTop: 40,
        marginLeft: '5%',
        marginRight: '5%',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1, // Agrega un borde inferior para separar las filas
        borderColor: '#ccc', // Color del borde
        paddingVertical: 7, // Espaciado vertical
      },
      cell: {
        flex: 1, // Hace que los elementos ocupen el mismo ancho
        textAlign: 'center', // Centra el texto horizontalmente
    },
    
});

export default StudentScreen;