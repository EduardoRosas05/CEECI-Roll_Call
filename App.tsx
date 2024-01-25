import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationStudent from './components/navigation';

const Stack = createNativeStackNavigator();

function Stacks(){
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="lista"
        options={{
          headerShown: false
        }}
        component={NavigationStudent}
      >
      </Stack.Screen>
    </Stack.Navigator>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <Stacks/>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
