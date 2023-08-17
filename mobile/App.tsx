import { StyleSheet } from 'react-native';
import GoogleLogin from './components/login/googleLogin';
import { useUser } from './context/user';

export default function App() {
  const { user } = useUser();

  return (
    <GoogleLogin />
  );
}

const styles = StyleSheet.create({
});
