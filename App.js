import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import ListaLivros from "./src/screens/ListaLivros";
import FormLivro from "./src/screens/FormLivro";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="ListaLivros"
        screenOptions={{
          headerStyle: { backgroundColor: "#4A90D9" },
          headerTintColor: "#FFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="ListaLivros" component={ListaLivros} options={{ title: "📚 Meus Livros" }} />
        <Stack.Screen name="FormLivro" component={FormLivro} options={{ title: "Novo Livro" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}