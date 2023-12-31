import { useState } from "react";
import { sendCloudinary } from "../../utilities/uploadImage";
import { sendRequest } from "../../utilities/sendRequest";
import Usuario from "../../interfaces/usuario";
import { useNavigate } from "react-router-dom";
import { Ubicacion } from "../../interfaces/ubicacion";
import React, { useRef } from 'react';
import edit from "../../assets/dash/editar.png"
import PerfilEdit from "../../assets/camera-solid.svg"
interface Form {
  foto: File | undefined;
  portada: File | undefined;
  nombre: string | undefined;
  descripcion: string | undefined;
  telefono: string;
  ubicacion: number | undefined;
}
import { useUser } from "../../context/useUser";
import { Container, Divfile, Portada } from "../../styles/perfil";
import Ubicaciones from "../../components/ubicaciones";
import toast from "react-hot-toast";
const Perfil = () => {
  const navigate = useNavigate();
  const { user, setUser, removeUbicacion } = useUser();
  const [fotoPre, setFotoPre] = useState<any>(null);
  const [portadaPre, setPortadaPre] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [agregarUbicacion, setAgregarUbicacion] = useState(false);
  const [form, setForm] = useState<Form>({
    foto: undefined,
    portada: undefined,
    nombre: user?.nombre,
    descripcion: user?.descripcion,
    telefono: String(user?.telefono || ""),
    ubicacion: user?.ubicacionActualId,
  });
  const seleccionarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm((old) => ({ ...old, foto: e.target.files?.[0] }));
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files?.[0]);
      reader.onload = () => {
        setFotoPre(reader.result);
      };
    }
  };
  const seleccionarPortada = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm((old) => ({ ...old, portada: e.target.files?.[0] }));
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files?.[0]);
      reader.onload = () => {
        setPortadaPre(reader.result);
      };
    }
  };
  const handleSave = async () => {
    let fotoUrl: string | undefined = undefined;
    let portadaUrl: string | undefined = undefined;
    if (form.foto) {
      fotoUrl = await sendCloudinary(form.foto, setProgress);
    }
    if (form.portada) {
      portadaUrl = await sendCloudinary(form.portada, setProgress);
    }
    const res = await sendRequest<Usuario>(
      `usuario/${user?.id}`,
      {
        foto: fotoUrl,
        portada: portadaUrl,
        nombre: form.nombre,
        descripcion: form.descripcion || null,
        telefono: form.telefono ? Number(form.telefono) : null,
        ubicacionActualId: form.ubicacion ? Number(form.ubicacion) : null,
      },
      {
        method: "PUT",
      }
    );
    if (res) {
      setForm({
        foto: undefined,
        portada: undefined,
        nombre: res.data.nombre,
        descripcion: res.data?.descripcion,
        telefono: String(res.data?.telefono || ""),
        ubicacion: res.data?.ubicacionActualId,
      });
      setUser(res.data);
      toast.success("Se actualizaron tus datos con éxito");
    }
  };
  const handleBorrar = async () => {
    const res = await sendRequest<Ubicacion>(
      `ubicacion/${form.ubicacion}`,
      null,
      {
        method: "DELETE",
      }
    );
    if (res) {
      setForm((old) => ({ ...old, ubicacion: undefined }));
      removeUbicacion(res.data);
      toast.success("Se eliminó la ubicación con éxito");
    }
  };
  const fileInputPortada = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const seleccionarFotoperfil = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {

    }
  };
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImageClickPortada = () => {
    if (fileInputPortada.current) {
      fileInputPortada.current.click();
    }
  };
  return (
    <Container>
      <Portada>
        <section className="bg">
        </section>
        <img src={form.portada ? portadaPre : user?.portada} alt="" />
        <div>
          <img src={form.foto ? fotoPre : user?.foto} alt="" />
          <img src={PerfilEdit} alt="editar" onClick={handleImageClick} />
          <input
            type="file"
            name="foto"
            onChange={(e) => seleccionarFoto(e)}
            //onChange={seleccionarFotoperfil}
            id="file"
            ref={fileInputRef}
          />
        </div>
        <section className="PortadaEdit">
          <img src={PerfilEdit} alt="" onClick={handleImageClickPortada}/>
          <input
              type="file"
              name="portada"
              onChange={(e) => seleccionarPortada(e)}
              //onChange={seleccionarFotoperfil}
              id="file"
              ref={fileInputPortada}
            />
        </section>
      </Portada>

      <section>
        <div>
          <label htmlFor="">Nombre</label>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) =>
              setForm((old) => ({ ...old, nombre: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="">Descripcion</label>
          <input
            type="text"
            name="descripcion"
            id=""
            value={form.descripcion}
            onChange={(e) =>
              setForm((old) => ({ ...old, descripcion: e.target.value }))
            }
          ></input>
        </div>
        <div>
          <label htmlFor="">Ubicacion</label>
          <select
            name=""
            id=""
            value={form.ubicacion}
            onChange={(e) =>
              setForm((old) => ({ ...old, ubicacion: Number(e.target.value) }))
            }
          >
            <option value="">Seleccionar ubicacion</option>
            {user?.ubicaciones.map((ubicacio) => (
              <>
                <option value={ubicacio.id} key={ubicacio.id}>
                  {ubicacio.nombre}
                </option>
              </>
            ))}
          </select>

        </div>
        <div>
          <label htmlFor="">Telefono</label>
          <input
            type="number"
            value={form.telefono}
            onChange={(e) =>
              setForm((old) => ({ ...old, telefono: e.target.value }))
            }
          />
        </div>


        <div>
          <button onClick={handleBorrar}>Eliminar ubicacion</button>
          <button onClick={() => setAgregarUbicacion(!agregarUbicacion)}>
            {!agregarUbicacion ? "Agregar ubicacion" : "Volver"}
          </button>
          {!agregarUbicacion ? (
            <></>
          ) : (
            <>
              <Ubicaciones cerrar={() => setAgregarUbicacion(false)} />

            </>
          )}

        </div>
        <div>

          <button onClick={handleSave}>Guardar</button>
        </div>
      </section>
    </Container>
  );
};

export default Perfil;
