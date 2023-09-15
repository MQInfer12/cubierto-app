
import { GoogleLogin } from "@react-oauth/google"
import { useUser } from "../../context/useUser"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles/styleGlobal";
import Acce from "../../assets/acces.svg"
import FondoGB from "../../assets/loginBG.png"
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
      setUser(user.data);
      if (user.data.rol == "usuario" || user.data.rol == "beneficiario") {
        navigate('/');

      }
      else {
        navigate('/dashboard');
      }
    }
  }
  return (
    <>
      <Login>
        <div>
          <Imgfondo src={FondoGB} alt="" />
          <h1>Inicia sesion</h1>
          <Imgicono src={Acce} alt="" />
          <p>Inicia sesion con tu cuenta de Google</p>
          <GoogleLogin
            onSuccess={res => getGoogleUser(res)}
            shape="circle"
            size='medium'
          />
        </div>
      </Login>
    </>
  )
}
export default Register
export const Login = styled.div`
  width: 100vw;
  height: calc(100vh - 105px);
  background-color: ${colors.primary};
   display: flex;
   justify-content: center;
   align-items: center;
    &>div {
      overflow: hidden;
      display: flex;
      width: 400px;
      height: 492px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 35px;
      box-shadow: 0px 5px 5px rgba(0,0,0,.2);
      border-radius: 20px;
      position: relative;
      background: ${colors.primary500};
      &>h1{
        color:${colors.light};
        position: relative;
        top: 20px;
      }
      &>p{
        color: ${colors.gray300};
        font-size: 17px;
      }
     
    }
`
const Imgfondo = styled.img`
top: 0;
width: 100.7%;
height: 300px;
position: absolute;
`;
const Imgicono = styled.img`
width: 250px;
height: 250px;
z-index: 1;
`;