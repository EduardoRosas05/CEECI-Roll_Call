import React, { useEffect, useState } from "react";
import Student from "../../domain/entities/student";
import StudentCard from "./components/getStudentScreen";
import { StudentProvider, useStudentState } from "../providers/getStudentProvider";
import { FlatList, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { IconButton } from 'react-native-paper';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Calen from "../../../../components/cale";

const StudentScreenView = () => {

    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const {
        students,
        loading,

        getStudent
    } = useStudentState();

    console.log('Renderizando componente principal');

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
                <Text style={styles.textStyleTitle}> Estudiantes</Text>
            </View>

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
    textStyleTitle: {
        width: 'auto',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textStyleDate: {
        width: 'auto',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default StudentScreen;