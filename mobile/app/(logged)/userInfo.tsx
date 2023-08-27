import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSetRouteName } from '../../context/routeName'
import FontedText from '../../components/global/fontedText';
import { useUser } from '../../context/user';
import { colors } from '../../styles/colors';
import Button from '../../components/global/button';
import { sendRequest } from '../../utilities/sendRequest';
import Usuario from '../../interfaces/usuario';
import { Dropdown } from 'react-native-element-dropdown';
import { router } from 'expo-router';
import { Ubicacion } from '../../interfaces/ubicacion';
import * as ImagePicker from 'expo-image-picker';
import { sendCloudinary } from '../../utilities/uploadImage';

interface Form {
  foto: ImagePicker.ImagePickerAsset | undefined,
  nombre: string | undefined,
  descripcion: string | undefined,
  telefono: string
  ubicacion: number | undefined
}

const UserInfo = () => {
  useSetRouteName("Información personal");
  const { user, setUser, removeUbicacion } = useUser();
  const [form, setForm] = useState<Form>({
    foto: undefined,
    nombre: user?.nombre,
    descripcion: user?.descripcion,
    telefono: String(user?.telefono || ""),
    ubicacion: user?.ubicacionActualId
  });
  const [progress, setProgress] = useState(0);

  const SeleccionarFoto = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7
    });
    if(!res.canceled) {
      setForm(old => ({...old, foto: res.assets[0] }));
    }
  }

  const handleSave = async () => {
    let fotoUrl: string | undefined = undefined;
    if(form.foto) {
      fotoUrl = await sendCloudinary(form.foto, setProgress);  
    }
    const res = await sendRequest<Usuario>(`usuario/${user?.id}`, {
      foto: fotoUrl,
      nombre: form.nombre,
      descripcion: form.descripcion || null,
      telefono: form.telefono ? Number(form.telefono) : null,
      ubicacionActualId: form.ubicacion ? Number(form.ubicacion) : null
    }, {
      method: "PUT"
    });
    if(res) {
      setForm({
        foto: undefined,
        nombre: res.data.nombre,
        descripcion: res.data?.descripcion,
        telefono: String(res.data?.telefono || ""),
        ubicacion: res.data?.ubicacionActualId
      });
      setUser(res.data);
      Alert.alert("Se actualizaron tus datos con éxito");
    }
  }

  const handleBorrar = async () => {
    const res = await sendRequest<Ubicacion>(`ubicacion/${form.ubicacion}`, null, {
      method: "DELETE"
    });
    if(res) {
      setForm(old => ({...old, ubicacion: undefined }))
      removeUbicacion(res.data);
      Alert.alert("Se eliminó la ubicación con éxito");
    }
  }

  if(!user) return null;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.fotoContainer}>
        <TouchableOpacity onPress={SeleccionarFoto}>
          <Image style={styles.foto} source={{ uri: form.foto?.uri || user.foto }} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Nombre de usuario</FontedText>
        <TextInput 
          style={styles.textInput} 
          value={form.nombre} 
          onChangeText={text => setForm(old => ({...old, nombre: text }))} 
        />
      </View>
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Email</FontedText>
        <TextInput 
          editable={false} 
          selectTextOnFocus={false} 
          style={styles.textInput} 
          value={user.email} 
        />
      </View>
      {
        user.rol === "restaurante" &&
        <>
        <View style={styles.inputContainer}>
          <FontedText style={styles.inputTitle} weight={600}>Descripción</FontedText>
          <TextInput 
            style={styles.textInput} 
            value={form.descripcion}
            onChangeText={text => setForm(old => ({...old, descripcion: text }))} 
          />
        </View>
        <View style={styles.inputContainer}>
          <FontedText style={styles.inputTitle} weight={600}>Teléfono</FontedText>
          <TextInput 
            style={styles.textInput} 
            value={String(form.telefono || "")} 
            keyboardType="numeric"
            onChangeText={text => setForm(old => ({...old, telefono: text.replace(/[^0-9]/g, ''),}))}
          />
        </View>
        <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Ubicación</FontedText>
          <View style={{flexDirection: "row", gap: 16, alignItems: "center" }}>
            <Dropdown 
              data={user.ubicaciones.map(ubicacion => ({
                label: ubicacion.nombre,
                value: String(ubicacion.id)
              }))}
              value={form.ubicacion ? String(form.ubicacion) : null}
              style={styles.dropdown}
              labelField="label"
              onChange={item => setForm(old => ({...old, ubicacion: Number(item.value) }))}
              valueField="value"
              placeholder="Selecciona ubicación"
              fontFamily='Biko400'
            />
            <View style={{ gap: 4 }}>
              <Button onPress={() => router.push("ubicacion")}>Nueva</Button>
              <Button onPress={handleBorrar}>Eliminar</Button>
            </View>
          </View>
        </View>
        </>
      }
      <Button onPress={handleSave}>Guardar cambios</Button>
    </ScrollView>
  )
}

export default UserInfo

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
    alignItems: "flex-end"
  },
  fotoContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  foto: {
    height: 104,
    width: 104,
    borderRadius: 60
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
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: "Biko400",
    color: colors.gray900,
    borderColor: colors.gray500,
    borderRadius: 8
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 16,
    color: colors.gray900,
    borderColor: colors.gray500,
    borderRadius: 8,
    height: 46
  }
})