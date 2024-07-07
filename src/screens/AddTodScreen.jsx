import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTodoScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTodo = () => {
    const newTodo = { title, description, time, date };
    navigation.navigate("home", { newTodo });
    setTitle("");
    setDescription("");
    setTime("");
    setDate(new Date());
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Todo</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={showDatepicker}
      >
        <Text style={styles.datePickerText}>Select Date</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Selected Date"
        value={date.toDateString()}
        editable={false}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  datePickerText: {
    color: "#007bff",
    textAlign: "center",
  },
});

export default AddTodoScreen;
