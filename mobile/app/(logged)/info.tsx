import { Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import FontedText from '../../components/global/fontedText'
import { useSetRouteName } from '../../context/routeName'
import Button from '../../components/global/button'
import { sendRequest } from '../../utilities/sendRequest'

const Info = () => {
  useSetRouteName('Info');

  const handleContacto = async () => {
    const res = await sendRequest<string>(`contacto/telefono`, null, {
      method: "GET"
    });
    if(res) {
      Linking.openURL(`https://wa.me/${res.data}`);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={require('../../assets/images/CubiertoLogo.png')} />
      <FontedText style={styles.ofertasText} weight={700}>¿Quiénes somos?</FontedText>
      <Text style={styles.normalText}>
        <Text style={styles.span}>Cubierto</Text> es una aplicación desarrollada por la <Text style={styles.span}>Universidad Franz Tamayo</Text> para combatir el <Text style={styles.span}>desperdicio 
        de comida</Text> a la ves que genera <Text style={styles.span}>economía</Text> en el sector gastronómico con <Text style={styles.span}>ofertas</Text> mayores que en cualquier otra aplicación.
      </Text>
      <FontedText style={styles.ofertasText} weight={700}>Modelo de negocio</FontedText>
      <Text style={styles.normalText}>
        Todos nuestros <Text style={styles.span}>restaurantes afiliados</Text> se comprometen a <Text style={styles.span}>no desperdiciar</Text> comida rematando sus productos con ofertas a un buen precio (por que el producto no se vendió 
        en el día, por que sobró materia prima, etc.) <Text style={styles.span}>aprovechando</Text> todos los recursos al máximo, <Text style={styles.span}>saciando</Text> los estómagos cochabambinos y <Text style={styles.span}>ayudando</Text> al planeta.
      </Text>
      <FontedText style={styles.ofertasText} weight={700}>Donaciones</FontedText>
      <Text style={styles.normalText}>
        Al formar parte de <Text style={styles.span}>Cubierto</Text> los restaurantes, proveedores y organizaciones benéficas generan un <Text style={styles.span}>círculo solidario</Text>, si
        alguna de las ofertas no se vendió por completo pasa a un <Text style={styles.span}>banco de alimentos</Text> que se donarán a los más necesitados, además, cualquier restaurante podrá donar
        voluntariamente sus productos y así generar <Text style={styles.span}>impacto positivo</Text> en nuestra ciudad. ❤️
      </Text>
      <FontedText style={styles.ofertasText} weight={700}>¿Quiéres formar parte?</FontedText>
      <Text style={styles.normalText}>
        ¡Cualquiera puede formar parte de <Text style={styles.span}>Cubierto</Text>! si tienes un restaurante, provees de productos alimenticios o quieres ayudar a los demás con tu
        organización, contácta con nosotros apretando el siguiente botón:
      </Text>
      <Button 
        icon='logo-whatsapp'
        onPress={handleContacto}
      >Contáctanos</Button>
      <FontedText style={styles.little}>Cubierto 2023, CIDTEC Unifranz</FontedText>
    </ScrollView>
  )
}

export default Info

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 20,
    padding: 20
  },
  ofertasText: {
    fontSize: 24,
    color: colors.gray900,
  },
  image: {
    height: 100,
    aspectRatio: 897 / 885,
  },
  normalText: {
    fontFamily: "Biko400",
    color: colors.gray600,
    lineHeight: 24,
  },
  span: {
    fontFamily: "Biko700",
    color: colors.primary500,
  },
  little: {
    fontSize: 12,
    color: colors.gray600,
  }
})