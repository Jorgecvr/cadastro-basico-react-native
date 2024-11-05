import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Platform, FlatList, Modal, TouchableOpacity } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { css } from './Css';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const savedUsers = await AsyncStorage.getItem('users');
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
        }
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      }
    };
    loadUsers();
  }, []);

  const saveUsers = async (newUsers) => {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(newUsers));
    } catch (error) {
      console.error('Erro ao salvar usuários:', error);
    }
  };

  const handleRegister = () => {
    if (name && age && address) {
      const newUsers = [...users, { id: Date.now(), name, age, address }];
      setUsers(newUsers);
      saveUsers(newUsers);
      setName('');
      setAge('');
      setAddress('');
    }
  };

  const handleDelete = (id) => {
    const filteredUsers = users.filter(user => user.id !== id);
    setUsers(filteredUsers);
    saveUsers(filteredUsers);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (editingUser && (name || age || address)) {
      const updatedUsers = users.map(user =>
        user.id === editingUser.id ? { ...user, name, age, address } : user
      );
      setUsers(updatedUsers);
      saveUsers(updatedUsers);
      setEditingUser(null);
      setName('');
      setAge('');
      setAddress('');
    }
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[css.container, css.darkbg]}
    >
      <View style={css.login__form}>
        <TextInput
          style={css.login__input}
          placeholder="Nome:"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={css.login__input}
          placeholder="Idade:"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={css.login__input}
          placeholder="Endereço:"
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity style={css.login__button} onPress={handleRegister}>
          <Text style={css.login__buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <View style={css.userBox}>
        <Text style={css.userBoxTitle}>
          Usuários cadastrados: {users.length}
        </Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={css.userItem}>
              <Text style={css.userName}>Nome: {item.name}</Text>
              <Text>Idade: {item.age}</Text>
              <Text>Endereço: {item.address}</Text>
              <View style={css.userActions}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Text style={css.editButton}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={css.deleteButton}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* Modal de Edição */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={css.modalContainer}>
          <View style={css.modalContent}>
            <Text style={css.modalTitle}>Editar Usuário</Text>
            <TextInput
              style={css.login__input}
              placeholder="Nome:"
              value={editingUser ? editingUser.name : ''}
              onChangeText={(text) => setEditingUser({ ...editingUser, name: text })}
            />
            <TextInput
              style={css.login__input}
              placeholder="Idade:"
              value={editingUser ? editingUser.age : ''}
              onChangeText={(text) => setEditingUser({ ...editingUser, age: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={css.login__input}
              placeholder="Endereço:"
              value={editingUser ? editingUser.address : ''}
              onChangeText={(text) => setEditingUser({ ...editingUser, address: text })}
            />
            <TouchableOpacity
              style={css.login__button}
              onPress={handleSaveEdit}
            >
              <Text style={css.login__buttonText}>Salvar Alterações</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={css.cancelButton}
            >
              <Text style={css.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
