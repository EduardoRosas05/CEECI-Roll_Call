import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StudentScreen from './features/student/application/screens/studentScreen';
import { Calen } from './components/cale';

export default function App() {
  return (
    <View style={styles.container}>
      <Calen></Calen>
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
