
import styled from "styled-components";
import { useState } from "react";
import { sendCloudinary } from "../../utilities/uploadImage";
import { sendRequest } from "../../utilities/sendRequest";
import Usuario from "../../interfaces/usuario";
import { useNavigate } from "react-router-dom";
import { Ubicacion } from "../../interfaces/ubicacion";
interface Form {
  foto: File | undefined,
  portada: File | undefined,
  nombre: string | undefined,
  descripcion: string | undefined,
  telefono: string
  ubicacion: number | undefined
}
import { useUser } from "../../context/useUser";
const Perfil = () => {
  const navigate = useNavigate();
  const { user, setUser, removeUbicacion } = useUser();
  const [fotoPre, setFotoPre] = useState<any>(null);
  const [portadaPre, setPortadaPre] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState<Form>({
    foto: undefined,
    portada: undefined,
    nombre: user?.nombre,
    descripcion: user?.descripcion,
    telefono: String(user?.telefono || ""),
    ubicacion: user?.ubicacionActualId
  });
  const seleccionarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm(old => ({ ...old, foto: e.target.files?.[0] }));
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files?.[0]);
      reader.onload = () => {
        setFotoPre(reader.result);
      };
    }
  }
  const seleccionarPortada = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm(old => ({ ...old, portada: e.target.files?.[0] }));
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files?.[0]);
      reader.onload = () => {
        setPortadaPre(reader.result);
      };
    }
  }
  const handleSave = async () => {
    let fotoUrl: string | undefined = undefined;
    let portadaUrl: string | undefined = undefined;
    if (form.foto) {
      fotoUrl = await sendCloudinary(form.foto, setProgress);
    }
    if (form.portada) {
      portadaUrl = await sendCloudinary(form.portada, setProgress);
    }
    const res = await sendRequest<Usuario>(`usuario/${user?.id}`, {
      foto: fotoUrl,
      portada: portadaUrl,
      nombre: form.nombre,
      descripcion: form.descripcion || null,
      telefono: form.telefono ? Number(form.telefono) : null,
      ubicacionActualId: form.ubicacion ? Number(form.ubicacion) : null
    }, {
      method: "PUT"
    });
    if (res) {
      setForm({
        foto: undefined,
        portada: undefined,
        nombre: res.data.nombre,
        descripcion: res.data?.descripcion,
        telefono: String(res.data?.telefono || ""),
        ubicacion: res.data?.ubicacionActualId
      });
      setUser(res.data);
      alert("Se actualizaron tus datos con éxito");
    }
  }
  const handleBorrar = async () => {
    const res = await sendRequest<Ubicacion>(`ubicacion/${form.ubicacion}`, null, {
      method: "DELETE"
    });
    if (res) {
      setForm(old => ({ ...old, ubicacion: undefined }))
      removeUbicacion(res.data);
      alert("Se eliminó la ubicación con éxito");
    }
  }
  return (
    <Container>
      <Portada>
        <img src={form.portada ? portadaPre : user?.portada} alt="" />
      </Portada>
      <label htmlFor="">Foto de perfil</label>
      <input type="file" name="foto" onChange={(e) => seleccionarFoto(e)} />
      <img src={form.foto ? fotoPre : user?.foto} alt="" />
      <label htmlFor="">{progress}</label>
      <label htmlFor="">Foto de portada</label>
      <input type="file" name="portada" onChange={(e) => seleccionarPortada(e)} />

      <label htmlFor="">Nombre</label>
      <input type="text" value={form.nombre} onChange={(e) => setForm(old => ({ ...old, nombre: e.target.value }))} />
      <label htmlFor="">Descripcion</label>
      <textarea name="descripcion" id="" value={form.descripcion} onChange={(e) => setForm(old => ({ ...old, descripcion: e.target.value }))} ></textarea>
      <label htmlFor="">Telefono</label>
      <input type="number" value={form.telefono} onChange={(e) => setForm(old => ({ ...old, telefono: e.target.value }))} />
      <label htmlFor="">Ubicacion</label>
      <select name="" id="" value={form.ubicacion} onChange={(e) => setForm(old => ({ ...old, ubicacion: Number(e.target.value) }))} >
        <option value="">Seleccionar ubicacion</option>
        {
          user?.ubicaciones.map((ubicacio) => (
            <>
              <option value={ubicacio.id} key={ubicacio.id}>{ubicacio.nombre}</option>
            </>
          ))
        }
      </select>
      <button onClick={() => navigate('/dashboard/ubicaciones')}>Agregar</button>
      <button onClick={handleBorrar} >Eliminar</button>
      <button onClick={handleSave}>Guardar</button>
    </Container>
  )
}

export default Perfil
const Container = styled.div`
width: 100vw;
height: 100hw;
  padding-left:calc(210px + 3rem) ;
  
  &>img{
    width: 80px;
    height: 80px;
  }
`;
const Portada = styled.div`
width: 100vw;
height: 200px;
&>img{

}
`;