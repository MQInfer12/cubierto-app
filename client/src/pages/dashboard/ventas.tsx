import styled from "styled-components"
import { useGet } from "../../hook/useGet"
import { Venta } from "../../interfaces/venta"
import { Section } from "../../styles/compStyleDash"
const Ventas = () => {
    const { res } = useGet<Venta[]>('venta/completado/117585476927134335712');

    return (
        <Section>
            <article>
                <p>Ventas</p>
            </article>
            <button>Excel </button>
            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Ganancia</th>
                        <th>Fecha de venta</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        res?.data.map((vent) => {
                            const total = vent.detalles.reduce((suma, detalle) => {
                                suma += detalle.cantidad * detalle.precioUnitario;
                                return suma;
                            }, 0)
                            return (
                                <tr key={vent.id}>
                                    <th> {vent.usuario.nombre} </th>
                                    <th> Total:{total}</th>
                                    <th>{vent.fecha}</th>
                                    <button>Excel</button>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </table>
        </Section>
    )
}

export default Ventas
const Container = styled.div`
    padding-left:calc(210px + 3rem) ;
`