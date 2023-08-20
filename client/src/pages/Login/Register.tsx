
import { GoogleLogin } from "@react-oauth/google"
import { useUser } from "../../context/useUser"
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const getGoogleUser = async (res: any) => {
    const response = await fetch(import.meta.env.VITE_BACK + `google/login`,
      {
        method: "POST",
        body: JSON.stringify({
          credential: res.credential
        }),
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        }
      }
    )
    if (response.ok) {
      const user = await response.json();
      setUser(user);
      navigate('/dashboard');
    }

  }
  return (
    <>
      <GoogleLogin
        onSuccess={res => getGoogleUser(res)}
        shape="circle"
        size='medium'
      />

    </>
  )
}
export default Register