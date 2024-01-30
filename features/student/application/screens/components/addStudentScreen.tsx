import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, FlatList, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import Checkbox from 'expo-checkbox';
import { format, isToday } from 'date-fns';
import { AddRollListProvider, useAddRollListState } from "../../providers/addRollListProvider";
import { StudentProvider, useStudentState } from "../../providers/getStudentProvider";
import Calen from "../../../../../components/cale";
import RollList from "../../../domain/entities/rollList";
import Student from "../../../domain/entities/student";


const StudentListA = ({
}) => {

  const { success,saveRollList } = useAddRollListState();

  const {
    students,

    getStudent
  } = useStudentState();

    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [checkedItems, setCheckedItems] = useState(Array(students.length).fill(false));

    useEffect(() => {
      const fetchData = async () => {
        console.log('Antes de getStudent');
        await getStudent();
        console.log('Después de getStudent, antes de loadCheckboxState');
        await loadCheckboxState();
        console.log('Después de loadCheckboxState');
      };
    
      fetchData();
    }, []);

    const shouldResetCheckboxState = async () => {
      try {
        const storedDate = await AsyncStorage.getItem('storedDate');
        const currentDate = format(new Date(), 'yyyy-MM-dd');
    
        return storedDate !== currentDate;
      } catch (error) {
        console.error('Error al obtener la fecha almacenada:', error);
        return false;
      }
    };

    useEffect(() => {
      const updateCheckboxState = async () => {
        const resetState = await shouldResetCheckboxState();
    
        if (resetState) {
          // Restablece el estado de los checkboxes si la fecha es diferente.
          const newCheckedItems = Array(students.length).fill(false);
          setCheckedItems(newCheckedItems);
    
          // Actualiza la fecha almacenada en AsyncStorage.
          await AsyncStorage.setItem('storedDate', format(new Date(), 'yyyy-MM-dd'));
        }
      };
    
      updateCheckboxState();
    }, [students]);

    const loadCheckboxState = async () => {
      try {
        const storedCheckedItems = await AsyncStorage.getItem('checkedItems');
  
        if (storedCheckedItems) {
          setCheckedItems(JSON.parse(storedCheckedItems));
        }
      } catch (error) {
        console.error('Error al cargar el estado de los checkboxes:', error);
      }
    };

    const saveCheckboxState = async (index: number, newState: boolean) => {
      try {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = newState;
  
        setCheckedItems(newCheckedItems);
  
        // Almacena el estado actualizado en AsyncStorage
        await AsyncStorage.setItem('checkedItems', JSON.stringify(newCheckedItems));
      } catch (error) {
        console.error('Error al guardar el estado de los checkboxes:', error);
      }
    };
    

    const handleCheckboxChangeAndSave = async (index: number) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = !newCheckedItems[index];
    
      setCheckedItems(newCheckedItems);
    
      const studentId = students[index].id ?? 0;
      const date = format(selectedDate, 'yyyy-MM-dd');
      const attendance = newCheckedItems[index];
    
      try {
        console.log("Saving user:", { studentId, date, attendance });
    
        // Llamada a la función de guardar en el provider
        const result = await saveRollList({ studentId, date, attendance });
    
        // Opcional: Mostrar una alerta o realizar alguna acción adicional al guardar
        if (result && success) {
          // Puedes mostrar una alerta de éxito aquí
          saveCheckboxState(index, attendance);
        } else {
          // Puedes mostrar una alerta de error aquí
        }
      } catch (error: any) {
        console.error("Error al guardar:", error);
        // Manejo de errores
      }
    };

    return(
        
      <View style={styles.container}>
         <View>
                <Text style={styles.textStyleTitle}> Estudiantes</Text>
            </View>
         <View style={styles.buttonCon}>   
                <View style={styles.buttonCo} >
                    <IconButton icon={"calendar"} size={50} iconColor="#01A9DB"/> 
                        <Text style={styles.textStyleDate}>
                        {selectedDate.toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            timeZone: 'UTC'
                        })}
                        </Text>     
                </View>
            </View>
      <View style={styles.header}>
        <Text style={styles.cell}>Nombre</Text>
        <Text style={styles.cell}>Matrícula</Text>
        <Text style={styles.cell}>Asistencia</Text>
      </View>
      
          {students.map((student, index) => (
              <View style={styles.row} key={`student-row-${index}`}>
              <Text style={styles.cellText}>{student.fullName}</Text>
              <Text style={styles.cellText}>{student.key}</Text>
              <View style={styles.cell}>
              <Checkbox
              color='#086A87'
                value={checkedItems[index]}
                onValueChange={() => handleCheckboxChangeAndSave(index)}
              />
            </View>
          </View>
          ))}

            <Calen
                visible={isCalendarVisible} 
                onClose={() => setCalendarVisible(false)}
                setSelectedDate={(date) => {
                    setSelectedDate(date);
                    setCalendarVisible(false);
                }}
            />
    </View>
  );
};

const AddStudentList = (props: any) => (
  <AddRollListProvider>
    <StudentProvider> 
      <StudentListA {...props}/>
    </StudentProvider>
  </AddRollListProvider>
)

export default AddStudentList;

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: '5%',
    marginRight: '5%',
  },
  header: {
    marginTop: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1, // Agrega un borde inferior para separar las filas
        borderColor: '#ccc', // Color del borde
        paddingVertical: 7, // Espaciado vertical
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
  textStyleTitle: {
    width: 'auto',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
},
  cellText: {
    textAlign: 'center',
    width: 100, // Ajusta el ancho según sea necesario
  },
  buttonCon:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 'auto',
    marginLeft: 8,
    marginRight: 8  

  },
    buttonCo: {
      alignItems: 'center'
  },
  textStyleDate: {
    width: 'auto',
    fontSize: 16,
    textAlign: 'center'
  },
});