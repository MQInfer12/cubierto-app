import styled from "styled-components";
import { colors } from "../styles/styleGlobal";

const Politicas = () => {
  return (
    <Container>
      <p>
        <b>Política de Privacidad de Cubierto</b>
        <br />
        <br />
        <small>Última actualización: 02 / 05 / 2024</small>
        <br />
        <br />
        Bienvenido a Cubierto, una aplicación que conecta restaurantes,
        proveedores, usuarios consumidores y beneficiarios para optimizar el uso
        de alimentos próximos a vencerse o a ser descartados. En Cubierto, nos
        tomamos muy en serio la privacidad de nuestros usuarios y nos esforzamos
        por garantizar la transparencia y seguridad en el manejo de sus datos
        personales. A continuación, detallamos nuestra política de privacidad
        para informarle cómo recopilamos, utilizamos, compartimos y protegemos
        su información personal.
        <br />
        <br />
        <br />
        <b>Información Recopilada</b>
        <br />
        <br />
        <b>Datos de Usuario:</b> Al registrarse en Cubierto, recopilamos
        información básica como su nombre, dirección de correo electrónico,
        foto de perfil de Google.
        <br />
        <br />
        <b>Datos de Transacción:</b> Cuando realiza compras o donaciones a
        través de la aplicación, recopilamos información de pago y precios.
        <br />
        <br />
        <b>Datos de Uso:</b> Recopilamos información sobre cómo utiliza la
        aplicación, incluidas las interacciones con restaurantes, proveedores y
        organizaciones benéficas.
        <br />
        <br />
        <b>Datos de Dispositivo:</b> Recopilamos información sobre su
        dispositivo móvil, incluido el tipo de dispositivo,
        sistema operativo y versión.
        <br />
        <br />
        <br />
        <b>Uso de la Información</b>
        <br />
        <br />
        Utilizamos la información recopilada para proporcionarle los servicios
        de Cubierto, procesar transacciones, mejorar la experiencia del usuario
        y enviarle comunicaciones relevantes.
        <br />
        <br />
        No compartimos información personal con terceros no afiliados sin su
        consentimiento, excepto cuando sea necesario para proporcionar nuestros
        servicios, cumplir con la ley o proteger nuestros derechos.
        <br />
        <br />
        <br />
        <b>Seguridad de Datos</b>
        <br />
        <br />
        Implementamos medidas de seguridad físicas, técnicas y administrativas
        para proteger su información contra accesos no autorizados, alteraciones
        o divulgaciones.
        <br />
        <br />
        Utilizamos métodos de cifrado estándar de la industria para proteger la
        información confidencial durante la transmisión y almacenamiento.
        <br />
        <br />
        <br />
        <b>Retención y Eliminación de Datos</b>
        <br />
        <br />
        Retenemos su información personal solo durante el tiempo necesario para
        cumplir con los fines para los que fue recopilada, a menos que se
        requiera un período de retención más largo por razones legales o
        comerciales legítimas.
        <br />
        <br />
        Usted puede solicitar la eliminación de su cuenta y datos personales en
        cualquier momento, sujeto a las leyes y regulaciones aplicables.
        <br />
        <br />
        <br />
        <b>Política de Privacidad</b>
        <br />
        <br />
        Para cualquier consulta, solicitud de acceso, corrección o eliminación
        de datos personales, o para informar sobre preocupaciones de privacidad,
        puede comunicarse con nuestro equipo de privacidad.
        <br />
        <br />
        Esta política de privacidad se aplica a la aplicación Cubierto y está
        sujeta a cambios periódicos. Le recomendamos revisar esta política
        regularmente para estar informado sobre nuestras prácticas de privacidad
        actualizadas.
        <br />
        <br />
        <br />
        Gracias por confiar en Cubierto para sus necesidades de alimentos y
        contribuciones benéficas. Nos comprometemos a proteger su privacidad y
        brindarle una experiencia segura y satisfactoria en nuestra plataforma.
      </p>
    </Container>
  );
};

export default Politicas;

export const Container = styled.div`
  min-height: calc(100vh - 105px);
  background-color: ${colors.primary};

  & > p {
    color: white;
    text-align: center;
    padding-inline: 40px;
    padding-bottom: 40px;
  }
`;
