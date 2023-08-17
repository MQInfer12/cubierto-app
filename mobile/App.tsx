import { StyleSheet } from 'react-native';
import GoogleLogin from './components/login/googleLogin';
import { useUser } from './context/user';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function App() {
  const { user, setUser } = useUser();

  if(!user) return <GoogleLogin />
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: user.foto }} />
      <Text>{user.nombre}</Text>
      <Text>{user.email}</Text>
      <TouchableOpacity onPress={() => setUser(null)}>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 200,
    height: 200
  }
});
