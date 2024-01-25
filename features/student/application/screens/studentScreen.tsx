import React, { useEffect, useState } from "react";
import Student from "../../domain/entities/student";
import { StudentProvider, useStudentState } from "../providers/getStudentProvider";
import { FlatList, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { IconButton } from 'react-native-paper';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Calen from "../../../../components/cale";
import { RollListProvider, useRollListState } from "../providers/getRollListProvider";
import StudentList from "./components/getStudentScreen";

const StudentScreenView = () => {

    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const {
        loading,
        rolllist,

        getRollList
    } = useRollListState();

    console.log('Renderizando componente principal');

    const renderCards = () => {
        if (rolllist == null){
            return null;
        }
        
        return (
            <FlatList
                data={rolllist}
                keyExtractor={(item) => `rollList${item.id}`}
                renderItem={({item}) => (
                    <StudentList
                        rolllist={item}
                    />
                )}
            />
        );
    };

    useEffect(()=>{
        getRollList();
    }, []);

    useEffect(()=>{
        console.log('Students:', rolllist);
    }, [rolllist]);


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
    <RollListProvider>
        <StudentScreenView {...props} />
    </RollListProvider>
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