import { RefreshControl, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontedText from '../../components/global/fontedText';
import { useGet } from '../../hooks/useGet';
import { useUser } from '../../context/user';
import { Notificacion } from '../../interfaces/notificacion';
import { useSetRouteName } from '../../context/routeName';
import { sendRequest } from '../../utilities/sendRequest';
import { colors } from '../../styles/colors';
import NotificationCard from '../../components/notification/notificationCard';
import NothingHere from '../../components/global/nothingHere';

const Notification = () => {
  useSetRouteName('Notificaciones');
  const { user, changeNotificacionesPendientes } = useUser();
  const { res, loading, getData, firstRender } = useGet<Notificacion[]>(`notificaciones/usuario/${user?.id}`);
  const [nots, setNots] = useState<Notificacion[] | null>(null);
  const [pendientes, setPendientes] = useState(user?.notificacionesPendientes || 0);

  useEffect(() => {
    if(res) {
      setNots(res.data);
    }
  }, [res]);

  useEffect(() => {
    const verNotificaciones = async () => {
      const res = await sendRequest(`notificacion/usuario/ver/${user?.id}`, null, {
        method: "PATCH"
      });
      if(res) {
        changeNotificacionesPendientes(() => 0);
      }
    }
    verNotificaciones();
  }, []);

  let newNots: Notificacion[] = []
  let oldNots: Notificacion[] = []
  let notsOrdered = [];
  if(nots && user) {
    notsOrdered = [...nots];
    notsOrdered.reverse();
    newNots = notsOrdered.filter((not, i) => i < pendientes);
    oldNots = notsOrdered.filter((not, i) => i >= pendientes);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container(!nots || nots.length === 0)}
      refreshControl={
        <RefreshControl 
          refreshing={loading && !firstRender}
          onRefresh={() => {
            getData();
            setPendientes(user?.notificacionesPendientes || 0);
          }}
        />
      }
    >
      {
        (!nots || nots.length === 0) ?
        <NothingHere 
          text={nots?.length === 0 ? "No tienes notificaciones" : "Cargando notificaciones..."}
          type={nots?.length === 0 ? "sad" : 'loading'}
        /> :
        <>
        {
          newNots.length !== 0 &&
          <>
          <FontedText style={styles.ofertasText} weight={700}>Notificaciones nuevas</FontedText>
          {newNots.map(notificacion => (
            <NotificationCard 
              key={notificacion.id} 
              notificacion={notificacion} 
              setNots={setNots}
            />
          ))}
          </>
        }
        {
          oldNots.length !== 0 &&
          <>
          <FontedText style={styles.ofertasText} weight={700}>Notificaciones anteriores</FontedText>
          {oldNots.map(notificacion => (
            <NotificationCard 
              key={notificacion.id} 
              notificacion={notificacion} 
              setNots={setNots}
            />
          ))}
          </>
        }
        </>
      }
    </ScrollView>
  )
}

export default Notification

const styles = StyleSheet.create<any>({  
  container: (fullscreen: boolean) => ({
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 20,
    flex: fullscreen ? 1 : undefined
  }),
  ofertasText: {
    fontSize: 24,
    color: colors.gray900,
  },
})