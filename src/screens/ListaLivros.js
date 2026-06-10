import React, { useState, useCallback } from "react";
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getLivros, deletarLivro } from "../services/livroService";

export default function ListaLivros({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      buscarLivros();
    }, [])
  );

  async function buscarLivros() {
    try {
      setCarregando(true);
      const dados = await getLivros();
      setLivros(dados);
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível carregar os livros.");
    } finally {
      setCarregando(false);
    }
  }

  function confirmarDelete(id, titulo) {
    Alert.alert("Deletar livro", `Tem certeza que quer deletar "${titulo}"?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Deletar", style: "destructive", onPress: () => handleDelete(id) },
    ]);
  }

  async function handleDelete(id) {
    try {
      await deletarLivro(id);
      setLivros((livrosAtuais) => livrosAtuais.filter((l) => l.id !== id));
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível deletar o livro.");
    }
  }

  function ItemLivro({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardInfo}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.autor}>✍️ {item.autor}</Text>
          <Text style={styles.ano}>📅 {item.ano}</Text>
        </View>
        <View style={styles.botoesCard}>
          <TouchableOpacity style={styles.botaoEditar}
            onPress={() => navigation.navigate("FormLivro", { livro: item })}>
            <Text style={styles.textoBotao}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoDeletar}
            onPress={() => confirmarDelete(item.id, item.titulo)}>
            <Text style={styles.textoBotao}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (carregando) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#4A90D9" />
        <Text>Carregando livros...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {livros.length === 0 ? (
        <View style={styles.centralizado}>
          <Text style={styles.semLivros}>📚 Nenhum livro cadastrado ainda</Text>
        </View>
      ) : (
        <FlatList
          data={livros}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ItemLivro item={item} />}
          contentContainerStyle={styles.lista}
        />
      )}
      <TouchableOpacity style={styles.botaoAdicionar}
        onPress={() => navigation.navigate("FormLivro", {})}>
        <Text style={styles.textoBotaoAdicionar}>+ Adicionar Livro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4F8" },
  lista: { padding: 16, paddingBottom: 80 },
  card: { backgroundColor: "#FFF", borderRadius: 12, padding: 16, marginBottom: 12, elevation: 3 },
  cardInfo: { marginBottom: 12 },
  titulo: { fontSize: 17, fontWeight: "bold", color: "#1A1A2E", marginBottom: 4 },
  autor: { fontSize: 14, color: "#555", marginBottom: 2 },
  ano: { fontSize: 13, color: "#888" },
  botoesCard: { flexDirection: "row", gap: 8 },
  botaoEditar: { flex: 1, backgroundColor: "#4A90D9", padding: 8, borderRadius: 8, alignItems: "center" },
  botaoDeletar: { flex: 1, backgroundColor: "#E74C3C", padding: 8, borderRadius: 8, alignItems: "center" },
  textoBotao: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  botaoAdicionar: { position: "absolute", bottom: 20, left: 20, right: 20, backgroundColor: "#27AE60", padding: 16, borderRadius: 12, alignItems: "center" },
  textoBotaoAdicionar: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  centralizado: { flex: 1, justifyContent: "center", alignItems: "center" },
  semLivros: { fontSize: 16, color: "#888" },
});