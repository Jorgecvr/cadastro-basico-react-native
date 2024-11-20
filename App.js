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
        const response = await fetch('http://192.168.1.108:3000/users'); // Altere <SEU_IP> para o IP do servidor
        const data = await response.json();
        setUsers(data);
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

  const handleRegister = async () => {
    if (name && age && address) {
      try {
        const response = await fetch('http://192.168.1.108:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, age, address }),
        });
  
        if (response.ok) {
          const newUser = await response.json();
          setUsers([...users, newUser]);
          setName('');
          setAge('');
          setAddress('');
        }
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://192.168.1.108:3000/users/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };
  
  const handleEdit = (user) => {
    setEditingUser(user); // Define o usuário que será editado
    setName(user.name); // Preenche os campos do formulário com os valores atuais do usuário
    setAge(user.age.toString());
    setAddress(user.address);
    setModalVisible(true); // Abre o modal
  };
  
  const handleSaveEdit = async () => {
    if (editingUser) {
      try {
        const response = await fetch(`http://192.168.1.108:3000/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, age, address }),
        });
  
        if (response.ok) {
          const updatedUser = await response.json();
          setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user))); // Atualiza o estado local
          setEditingUser(null);
          setName('');
          setAge('');
          setAddress('');
          setModalVisible(false); // Fecha o modal
        }
      } catch (error) {
        console.error('Erro ao editar usuário:', error);
      }
    }
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
          placeholder="Email:"
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
            value={name} // Usa o estado local
            onChangeText={setName}
          />
          <TextInput
            style={css.login__input}
            placeholder="Idade:"
            value={age} // Usa o estado local
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <TextInput
            style={css.login__input}
            placeholder="Endereço:"
            value={address} // Usa o estado local
            onChangeText={setAddress}
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
