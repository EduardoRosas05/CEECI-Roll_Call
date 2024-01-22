import React, { useEffect } from "react";
import Student from "../../domain/entities/student";
import StudentCard from "./components/getStudentScreen";
import { StudentProvider, useStudentState } from "../providers/getStudentProvider";
import { FlatList, StyleSheet, Text, View } from "react-native";

const StudentScreenView = () => {

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
            <View style={styles.margenes}>
                <Text> Estudiantes :3</Text>
            </View>
            <View style={styles.list}>
            {renderCards()}
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
    },
    margenes: {
        marginTop: 300,
        marginBottom: 100,
    }
});

export default StudentScreen;