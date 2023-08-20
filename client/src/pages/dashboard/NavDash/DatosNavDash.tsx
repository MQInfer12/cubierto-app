import { useUser } from "../../../context/useUser"
const DatosNavDash = () => {
  const { user } = useUser();

  return (
    <div>
      <section>
        <p>LOGOTIPO</p>
        <img src={user?.data.foto} alt="perfil" />
        <h2>{user?.data.nombre}</h2>
        <h3>{user?.data.email}</h3>
      </section>
    </div>
  )
}

export default DatosNavDash
