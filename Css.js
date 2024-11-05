import { StyleSheet } from "react-native";

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  darkbg: {
    backgroundColor: "#121212"
  },
  login__form: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 20,
    marginTop: 100
  },
  login__input: {
    backgroundColor: "#f1f3f5",
    color: "#333",
    fontSize: 16,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ced4da"
  },
  login__button: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  login__buttonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#ffffff",
    textTransform: "uppercase",
  },
  userBox: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 20,
    flex: 1
  },
  userBoxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333"
  },
  userItem: {
    backgroundColor: '#e9ecef',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  deleteButton: {
    color: '#dc3545',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: '#dc3545',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export { css };

