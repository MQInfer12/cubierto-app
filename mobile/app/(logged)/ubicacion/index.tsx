import { Alert, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useSetRouteName } from '../../../context/routeName'
import FontedText from '../../../components/global/fontedText';
import { useUser } from '../../../context/user';
import { colors } from '../../../styles/colors';
import Button from '../../../components/global/button';
import { sendRequest } from '../../../utilities/sendRequest';
import { router } from 'expo-router';
import { Ubicacion } from '../../../interfaces/ubicacion';
import { Form, validate } from './validate';

const UserInfo = () => {
  useSetRouteName("Información personal");
  const { user, addUbicacion } = useUser();
  const [form, setForm] = useState<Form>({
    nombre: "",
    latitud: "",
    longitud: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const message = validate(form);
    if(message) return Alert.alert(message);
    setLoading(true);
    const res = await sendRequest<Ubicacion>(`ubicacion`, {
      nombre: form.nombre,
      latitud: Number(form.latitud),
      longitud: Number(form.longitud),
      usuarioId: user?.id
    });
    if(res) {
      addUbicacion(res.data);
      Alert.alert("Se guardó la ubicación con éxito");
      router.back();
    }
    setLoading(false);
  }

  if(!user) return null;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Nombre de la ubicación</FontedText>
        <TextInput 
          style={styles.textInput} 
          value={form.nombre} 
          onChangeText={text => setForm(old => ({...old, nombre: text }))} 
        />
      </View>
      <FontedText style={styles.sizeAlert}>Para obtener tus coordenadas ingresa a Google Maps, mantén tu dedo en la ubicación que desees y haz click en los números que están entre paréntesis '(lat, lng)' para copiarlos y pégalos en los recuadros de abajo.</FontedText>
      <FontedText style={styles.sizeAlert}>Ejm. Latitud: -17.3844166, Longitud: -66.135518</FontedText>
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Latitud</FontedText>
        <TextInput 
          style={styles.textInput} 
          value={form.latitud} 
          onChangeText={text => setForm(old => ({...old, latitud: text.replace(/[^0-9-.]/g, '') }))} 
        />
      </View>
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Longitud</FontedText>
        <TextInput 
          style={styles.textInput} 
          value={form.longitud} 
          onChangeText={text => setForm(old => ({...old, longitud: text.replace(/[^0-9-.]/g, '') }))} 
        />
      </View>
      <Button onPress={handleSave} disabled={loading}>{loading ? "Cargando..." : "Guardar ubicación"}</Button>
    </ScrollView>
  )
}

export default UserInfo

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 16,
    alignItems: "center"
  },
  inputContainer: {
    gap: 4,
    width: "100%"
  },
  inputTitle: {
    fontSize: 14,
    color: colors.gray600,
    marginLeft: 8
  },
  sizeAlert: {
    fontSize: 12,
    color: colors.gray600,
    alignSelf: "flex-start"
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: "Biko400",
    color: colors.gray900,
    borderColor: colors.gray500,
    borderRadius: 8
  }
})