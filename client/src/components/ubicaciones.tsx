import { useUser } from "../context/useUser";
import { sendRequest } from "../utilities/sendRequest";
import { Ubicacion } from "../interfaces/ubicacion";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Ubicaciones = () => {
    const navigate = useNavigate();
    const { user, addUbicacion } = useUser();
    const [form, setForm] = useState({
        nombre: "",
        latitud: "",
        longitud: ""
    });

    const handleSave = async () => {
        const res = await sendRequest<Ubicacion>(`ubicacion`, {
            nombre: form.nombre,
            latitud: Number(form.latitud),
            longitud: Number(form.longitud),
            usuarioId: user?.id
        });
        if (res) {
            addUbicacion(res.data);
            alert("Se guardó la ubicación con éxito");
            navigate("/dashboard/perfil");
        }
    }
    //(e) => setForm(old => ({ ...old, telefono: e.target.value }))}
    return (
        <Container>
            <label htmlFor="">Nombre</label>
            <input type="text" onChange={(e) => setForm(old => ({ ...old, nombre: e.target.value }))} value={form.nombre} />
            <label htmlFor="">Latitud</label>
            <input type="number" onChange={(e) => setForm(old => ({ ...old, latitud: e.target.value }))} value={form.latitud} />
            <label htmlFor="">Longitud</label>
            <input type="number" value={form.longitud} onChange={(e) => setForm(old => ({ ...old, longitud: e.target.value }))} />
            <button onClick={handleSave}>Guardar</button>
        </Container>
    )
}

export default Ubicaciones
const Container = styled.div`
  padding-left:calc(210px + 3rem) ;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;