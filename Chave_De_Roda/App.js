import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import API from './components/API';
import Login from './components/login';
import Cadastro from './components/cadastro';
import Dashboard from './components/dashboard';
import Alinhamento from './components/Alinhamento';
import Agendamento from './components/Agendamento';
import Agendamento2 from './components/Agendamento2';
import Confirm from './components/Confirm';
import Manutencao from './components/Manutencao';
import Troca from './components/Troca_oleo';
import Maps from './components/API';
import Revisao from './components/Revisao';
import firebase from 'firebase';
import firebaseConfig from './database/Firebase';

const Stack = createStackNavigator();

function Home() {
  return (
    <Stack.Navigator
      initialRouteName=""
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2E2A2A',
        },
        headerTintColor: '#FFA500',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="" component={Troca} />
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="Alinhamento" component={Alinhamento} />
      <Stack.Screen name="Maps" component={Maps} />
      <Stack.Screen
        name="Agendamento"
        component={Agendamento}
        options={{ headerLeft: null }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ title: 'Logar' }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ title: '' }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Revisao"
        component={Revisao}
        options={({ title: 'Inicio' }, { headerLeft: null })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  );
}
