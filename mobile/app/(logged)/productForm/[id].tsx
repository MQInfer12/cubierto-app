import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontedText from '../../../components/global/fontedText'
import { useUser } from '../../../context/user'
import Button from '../../../components/global/button'
import { colors } from '../../../styles/colors'
import { useSetRouteName } from '../../../context/routeName'
import { Dropdown } from 'react-native-element-dropdown'
import { useGet } from '../../../hooks/useGet'
import { Categoria } from '../../../interfaces/categoria'
import * as ImagePicker from 'expo-image-picker';
import { sendCloudinary } from '../../../utilities/uploadImage'
import { sendRequest } from '../../../utilities/sendRequest'
import { Producto } from '../../../interfaces/producto'
import { router, useLocalSearchParams } from 'expo-router'

interface Form {
  foto: ImagePicker.ImagePickerAsset | null
  nombre: string
  descripcion: string
  precio: string
  categoriaId: string | null
}

const ProductForm = () => {
  useSetRouteName('Editar producto');
  const { id } = useLocalSearchParams();
  const { editProducto } = useUser();
  const { res: resProducto } = useGet<Producto>(`producto/${id}`);
  const { res } = useGet<Categoria[]>('categoria');
  const [form, setForm] = useState<Form>({
    foto: null,
    nombre: "",
    descripcion: "",
    precio: "",
    categoriaId: null,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if(resProducto) {
      setForm({
        foto: null,
        nombre: resProducto.data.nombre,
        descripcion: resProducto.data.descripcion,
        precio: String(resProducto.data.precio),
        categoriaId: String(resProducto.data.categoriaId)
      });
    }
  }, [resProducto]);

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
    const res = await sendRequest<Producto>(`producto/${id}`, {
      foto: fotoUrl,
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      categoriaId: form.categoriaId ? Number(form.categoriaId) : null
    }, {
      method: "PUT"
    });
    if(res) {
      editProducto(res.data);
      router.push("productos");
      Alert.alert("Se modificó tu producto con éxito");
    }
  }

  if(!resProducto) return null;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.fotoContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Foto</FontedText>
        <TouchableOpacity onPress={SeleccionarFoto}>
          <Image 
            style={styles.foto} 
            source={{ uri: form.foto ? form.foto.uri : resProducto.data.foto }} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Nombre</FontedText>
        <TextInput 
          style={styles.textInput} 
          value={form.nombre}
          onChangeText={text => setForm(old => ({...old, nombre: text }))}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Descripción</FontedText>
        <TextInput  
          style={styles.textInput} 
          value={form.descripcion}
          onChangeText={text => setForm(old => ({...old, descripcion: text }))}
        />
      </View> 
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Precio</FontedText>
        <TextInput  
          style={styles.textInput} 
          value={form.precio} 
          onChangeText={text => setForm(old => ({...old, precio: text.replace(/[^0-9.]/g, '') }))} 
        />
      </View>
        <View style={styles.inputContainer}>
          <FontedText style={styles.inputTitle} weight={600}>Categoría</FontedText>
          <Dropdown
            data={res ? res.data.map(categoria => ({
              label: categoria.nombre,
              value: String(categoria.id)
            })) : []}
            value={form.categoriaId}
            style={styles.dropdown}
            labelField="label"
            onChange={item => setForm(old => ({...old, categoriaId: item.value }))}
            valueField="value"
            placeholder="Selecciona categoría"
            fontFamily='Biko400'
          />
        </View>
      <Button onPress={handleSave}>Guardar cambios</Button>
    </ScrollView>
  )
}

export default ProductForm

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
    alignItems: "flex-end"
  },
  fotoContainer: {
    alignSelf: "flex-start",
    flexDirection: "column",
    gap: 4
  },
  foto: {
    height: 104,
    width: 104,
    borderRadius: 8,
    borderColor: colors.gray500,
    borderWidth: 1
  },
  fotoPortada: {
    height: 104,
    flex: 1,
    borderRadius: 8,
    borderColor: colors.gray500,
    borderWidth: 1
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