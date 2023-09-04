import styled from "styled-components"
import { useGet } from "../../hook/useGet"
import { Venta } from "../../interfaces/venta"
const Ventas = () => {
    const { res } = useGet<Venta[]>('venta/completado/117585476927134335712');

    return (
        <Container>
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
                        res?.data.map((venta) => {
                            const total = venta.detalles.reduce((suma, detalle) => {
                                suma += detalle.cantidad * detalle.precioUnitario;
                                return suma;
                            }, 0)
                            return (
                                <tr key={venta.id}>
                                    <th> {venta.usuario.nombre} </th>
                                    <th> Total:{total}</th>
                                    <th>{venta.fecha}</th>
                                    <button>Excel</button>
                                </tr>
                            )
                        }
                        )
                    }
                </tbody>
            </table>
        </Container>
    )
}

export default Ventas
const Container = styled.div`
    padding-left:calc(210px + 3rem) ;
`