    import React, { useEffect, useState } from "react";
    import Student from "../../domain/entities/student";
    import { StudentProvider, useStudentState } from "../providers/getStudentProvider";
    import { FlatList, StyleSheet, Text, View, TouchableOpacity, Switch} from "react-native";
    import SelectDropdown from 'react-native-select-dropdown';
    import { Button, IconButton } from 'react-native-paper';
    import { format, } from 'date-fns';
    import Calen from "../../../../components/cale";
    import { RollListProvider, useRollListState } from "../providers/getRollListProvider";
    import StudentList from "./components/getStudentScreen";
    import RollList from "../../domain/entities/rollList";

    const StudentScreenView = () => {

        const [isCalendarVisible, setCalendarVisible] = useState(false);
        const [selectedDate, setSelectedDate] = useState(new Date());
        const [filteredRollList, setFilteredRollList] = useState<RollList[]>([]);
        const [selectedCourse, setSelectedCourse] = useState<any>(null);
        const [forceUpdate, setForceUpdate] = useState(0);
        

        const {
            loading,
            rolllist,

            getRollList
        } = useRollListState();

        const renderDropdownData = () => {
            if (!rolllist || rolllist.length === 0) {
                return [];
            }
        
            return Array.from(new Set(rolllist.map(item => item.courseFull)))
                .map(course => ({ value: course, label: course }));
        };

        const handleReset = () => {
            // Restablecer todos los estados a sus valores iniciales
            setCalendarVisible(false);
            setSelectedDate(new Date());
            setSelectedCourse(null);
            // Puedes agregar más reset de estados según sea necesario
        };

        useEffect(() => {
            
            // Filtrar la lista basándose en la fecha y el curso seleccionado
            const filteredList = rolllist.filter(item => {
                const itemDate = new Date(item.date); // Asegurarse de que item.date es un formato de fecha válido
        
                // Filtrar por fecha
                const isSameDate = (
                    itemDate.getUTCFullYear() === selectedDate.getUTCFullYear() &&
                    itemDate.getUTCMonth() === selectedDate.getUTCMonth() &&
                    itemDate.getUTCDate() === selectedDate.getUTCDate()
                );
        
                const isSameCourse = selectedCourse === null || (selectedCourse && item.courseFull === selectedCourse.value);

                return isSameDate && isSameCourse;
            });
        
            setFilteredRollList(filteredList);
        }, [rolllist, selectedDate, selectedCourse]);

        const renderCards = () => {
            if (filteredRollList == null) {
                return null;
            }

            return (
                <FlatList
                    data={filteredRollList}
                    keyExtractor={(item) => `rollList${item.id}`}
                    renderItem={({ item }) => (
                        <StudentList
                            rolllist={item}
                        />
                    )}
                />
            );
        };

        useEffect(()=>{
            getRollList();
        }, [forceUpdate]);

        return (
            <View style={styles.container}>
                
                <View>
                    <Text style={styles.textStyleTitle}> Estudiantes</Text>
                </View>

                <View style={styles.buttonCo}>   
                    <TouchableOpacity style={styles.buttonCo} onPress={() => setCalendarVisible(true)} >
                        <IconButton icon={"calendar"} size={50} iconColor="green"/> 
                            <Text style={styles.textStyleDate}>
                            {format(selectedDate, 'yyyy-MM-dd')}
                            </Text>     
                    </TouchableOpacity>
                </View>

                <View style={styles.dropdown}>
                    <SelectDropdown
                        data={renderDropdownData()}
                        onSelect={(selectedCourse, index) => setSelectedCourse(selectedCourse)}
                        defaultButtonText="Selecciona un curso"
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // Puedes personalizar el texto después de la selección si lo deseas
                            return selectedItem.label;
                        }}
                        rowTextForSelection={(item, index) => item.label}
                    />
                </View>

                <View style={styles.buttonConReset}>
                    <Button style={styles.buttonReset} onPress={handleReset} buttonColor='#04B400'>
                        <Text style={styles.textStyleButton}>Restablecer</Text>
                    </Button>
                    <Button
                        style={styles.buttonReset}
                        onPress={() => setForceUpdate(prevState => prevState + 1)}
                        buttonColor='#04B400'
                        >
                        <Text style={styles.textStyleButton}>Actualizar</Text>
                    </Button>
                </View>


                <View style={styles.container1}>
                    <Text style={styles.cell}>Nombre</Text>
                    <Text style={styles.cell}>Curso</Text>
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
        container: {
            flex: 1
        },
        list: {
            marginLeft: '5%',
            marginRight: '5%'
        },
        buttonCalendar:{
            flexDirection: 'row',
            justifyContent: 'center',
        },
        dropdown: {
            borderRadius: 15,
            flexDirection: 'row',
            justifyContent: 'center',
        },
        buttonCo: {
            alignItems: 'center'
        },
        textStyleTitle: {
            width: 'auto',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center'
        },
        textStyleButton: {
            width: 'auto',
            fontSize: 17,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center'
        },
        textStyleDate: {
            width: 'auto',
            fontSize: 16,
            textAlign: 'center'
        },
        buttonConReset: {
            alignContent: 'center',
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            width: 200,
            height: 40,
            marginVertical: 10,
        },
        buttonReset:{
            justifyContent: 'center',
            marginLeft: 60,
        },
        container1: {
            marginTop: 5,
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