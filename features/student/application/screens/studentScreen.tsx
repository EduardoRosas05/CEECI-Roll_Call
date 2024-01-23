import React, { useEffect, useState } from "react";
import Student from "../../domain/entities/student";
import StudentCard from "./components/getStudentScreen";
import { StudentProvider, useStudentState } from "../providers/getStudentProvider";
import { FlatList, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { IconButton } from 'react-native-paper';
import Calendar from "../../../../components/calendar";

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
                    <IconButton icon={"calendar"} size={50}>
                        
                    </IconButton>   
                    <Text style={styles.textStyle}>
                        Selecione una fecha
                    </Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.list}>
            {renderCards()}
            </View>
            <View>
            <Calendar
                visible={isCalendarVisible}
                onClose={() => setCalendarVisible(false)}
                onDateSelect={(date) => {
                    setSelectedDate(date);
                    setCalendarVisible(false);
                }}
                />
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
        marginTop: 40
    },
    head: {
        marginTop: 200,
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
    }
});

export default StudentScreen;