import { useUser } from "../context/useUser";
import { sendRequest } from "../utilities/sendRequest";
import { Ubicacion } from "../interfaces/ubicacion";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../styles/styleGlobal";
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
display:flex;
flex-direction:row;
flex-wrap:wrap;
gap:1em;
margin:1em;
padding:2em;
/* box-shadow:1px 5px 5px #0005; */
border:dashed 1px #0005;

& label{
width:20%;
letter-spacing: 0.1em;
font-size: 0.8em;
}
& input{
    width:70%;
    border: solid 1px #0005;
        padding: 0.5em;
        border-radius: 1em;
}
& > button{
  padding:.5em 2em;
        border: none;
        background: ${colors.primary};
        border-radius: 2em;
        color: ${colors.light};
        font-size: 0.8em;
        font-weight: 100;
        cursor: pointer;
}
`;