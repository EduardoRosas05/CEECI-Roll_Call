import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StudentScreen from './features/student/application/screens/studentScreen';
import AddStudentList from './features/student/application/screens/components/addStudentScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <AddStudentList/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
