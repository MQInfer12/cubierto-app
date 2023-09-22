import { Alert, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import FontedText from '../../../components/global/fontedText'
import { useUser } from '../../../context/user'
import Button from '../../../components/global/button'
import { colors } from '../../../styles/colors'
import { useSetRouteName } from '../../../context/routeName'
import { Dropdown } from 'react-native-element-dropdown'
import { sendRequest } from '../../../utilities/sendRequest'
import { Producto } from '../../../interfaces/producto'
import { router } from 'expo-router'
import { Form, validate } from './validate'

const OfertaForm = () => {
  useSetRouteName('Añadir oferta');
  const { user } = useUser();
  const [form, setForm] = useState<Form>({
    productoId: null,
    cantidad: "",
    precioDescontado: "",
    tiempo: ""
  });
  const [loading, setLoading] = useState(false);
  const productoSeleccionado = user?.productos.find(producto => String(producto.id) === form.productoId);
  
  const handleSave = async () => {
    setLoading(true);
    const res = await sendRequest<Producto>(`productoActivo`, {
      productoId: form.productoId ? Number(form.productoId) : null,
      cantidad: Number(form.cantidad),
      precioDescontado: Number(form.precioDescontado),
      tiempo: form.tiempo ? Number(form.tiempo) : undefined
    }, {
      method: "POST"
    });
    if(res) {
      router.push("ofertas");
      Alert.alert("Se añadió tu oferta con éxito");
    }
    setLoading(false);
  }

  const handleAlertSave = () => {
    const message = validate(form, productoSeleccionado?.precio as number);
    if(message) return Alert.alert(message);
    Alert.alert("¿Estás seguro?", "No podrás modificar ni eliminar la oferta", [{
      text: "Cancelar",
      onPress: () => {
        return;
      }
    }, {
      text: "Continuar",
      onPress: handleSave
    }]);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Producto</FontedText>
        <Dropdown
          data={user ? user.productos.map(producto => ({
            label: producto.nombre,
            value: String(producto.id)
          })) : []}
          value={form.productoId}
          onChange={item => setForm(old => ({...old, productoId: item.value }))}
          style={styles.dropdown}
          labelField="label"
          valueField="value"
          placeholder="Selecciona producto"
          fontFamily='Biko400'
        />
      </View>
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Cantidad</FontedText>
        <TextInput 
          style={styles.textInput} 
          value={form.cantidad}
          onChangeText={text => setForm(old => ({...old, cantidad: text }))}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>
          Precio descontado {form.productoId && `(Antes Bs. ${productoSeleccionado?.precio})`}
        </FontedText>
        <TextInput  
          style={styles.textInput} 
          value={form.precioDescontado}
          onChangeText={text => setForm(old => ({...old, precioDescontado: text.replace(/[^0-9.]/g, '') }))} 
        />
      </View> 
      <View style={styles.inputContainer}>
        <FontedText style={styles.inputTitle} weight={600}>Tiempo (minutos) (por defecto: 60)</FontedText>
        <TextInput  
          style={styles.textInput} 
          value={form.tiempo} 
          onChangeText={text => setForm(old => ({...old, tiempo: text.replace(/[^0-9]/g, '') }))} 
        />
      </View>
      <Button onPress={handleAlertSave} disabled={loading}>{loading ? "Cargando..." : "Publicar oferta"}</Button>
    </ScrollView>
  )
}

export default OfertaForm

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