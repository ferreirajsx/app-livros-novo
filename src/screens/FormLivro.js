import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform,
} from "react-native";
import { criarLivro, atualizarLivro } from "../services/livroService";

export default function FormLivro({ route, navigation }) {
  const livroParaEditar = route.params?.livro;
  const estaEditando = !!livroParaEditar;

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (estaEditando) {
      setTitulo(livroParaEditar.titulo);
      setAutor(livroParaEditar.autor);
      setAno(livroParaEditar.ano.toString());
    }
    navigation.setOptions({
      title: estaEditando ? "Editar Livro" : "Novo Livro",
    });
  }, []);

  function validar() {
    if (!titulo.trim()) { Alert.alert("Atenção", "Informe o título"); return false; }
    if (!autor.trim()) { Alert.alert("Atenção", "Informe o autor"); return false; }
    if (!ano.trim() || isNaN(ano) || ano.length !== 4) { Alert.alert("Atenção", "Informe um ano válido"); return false; }
    return true;
  }

  async function handleSalvar() {
    if (!validar()) return;
    try {
      setSalvando(true);
      const dadosLivro = { titulo: titulo.trim(), autor: autor.trim(), ano: parseInt(ano) };
      if (estaEditando) {
        await atualizarLivro(livroParaEditar.id, dadosLivro);
        Alert.alert("Sucesso", "Livro atualizado!", [{ text: "OK", onPress: () => navigation.goBack() }]);
      } else {
        await criarLivro(dadosLivro);
        Alert.alert("Sucesso", "Livro cadastrado!", [{ text: "OK", onPress: () => navigation.goBack() }]);
      }
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível salvar.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Título *</Text>
        <TextInput style={styles.input} placeholder="Ex: O Senhor dos Anéis" value={titulo} onChangeText={setTitulo} />

        <Text style={styles.label}>Autor *</Text>
        <TextInput style={styles.input} placeholder="Ex: J.R.R. Tolkien" value={autor} onChangeText={setAutor} />

        <Text style={styles.label}>Ano *</Text>
        <TextInput style={styles.input} placeholder="Ex: 1954" value={ano} onChangeText={setAno} keyboardType="numeric" maxLength={4} />

        <TouchableOpacity style={[styles.botaoSalvar, salvando && styles.botaoDesabilitado]} onPress={handleSalvar} disabled={salvando}>
          <Text style={styles.textoBotao}>{salvando ? "Salvando..." : estaEditando ? "Atualizar" : "Cadastrar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoCancelar}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4F8", padding: 20 },
  label: { fontSize: 15, fontWeight: "600", color: "#333", marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#DDD", borderRadius: 10, padding: 14, fontSize: 15 },
  botaoSalvar: { backgroundColor: "#4A90D9", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 28 },
  botaoDesabilitado: { backgroundColor: "#A0C4E8" },
  textoBotao: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  botaoCancelar: { padding: 14, alignItems: "center", marginTop: 10 },
  textoCancelar: { color: "#888", fontSize: 15 },
});