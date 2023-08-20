import { useUser } from "../../../context/useUser"
const DatosNavDash = () => {
  
  const {user} = useUser();
  
  return (
    <div>
       <section>
        <p>LOGOTIPO</p> 
        <img src={user?.foto} alt="perfil" />
        <h2>{user?.nombre}</h2>
        <h3>{user?.email}</h3>
      </section>
    </div>
  )
}

export default DatosNavDash
