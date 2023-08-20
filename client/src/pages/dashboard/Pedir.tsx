import { useUser } from "../../context/useUser"
import { useGet } from "../../hook/useGet";
import { Categoria } from "../../interfaces/categoria";
const Pedir = () => {
  const { logout } = useUser();
  const { res } = useGet<Categoria[]>('categoria');

  return (
    <div>
      {res?.data.map((cateroria) => (
        <>
          <div key={cateroria.id}>
            <h2>{cateroria.nombre}</h2>
          </div>
        </>
      ))}
      <button onClick={logout}>Cerrar sesion</button>
    </div>
  )
}

export default Pedir