import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useSetRouteName } from '../../context/routeName';
import Tabs from '../../components/global/tabs';
import DonacionBeneficiario from '../../components/donations/donacionBeneficiario';
import MisDonaciones from '../../components/donations/misDonaciones';
import DonacionesCompletadas from '../../components/donations/donacionesCompletadas';
import { useUser } from '../../context/user';
import DonacionRestaurante from '../../components/donations/donacionRestaurante';

export type Page = "Donaciones" | "Pendientes" | "Completadas";

const Donations = () => {
  useSetRouteName('Donaciones');
  const { user } = useUser();
  const [page, setPage] = useState<Page>("Donaciones");
  const tabsData: Page[] = ["Donaciones", "Pendientes", "Completadas"];

  return (
    <>
    <View style={styles.tabsContainer}>
      <Tabs 
        page={page}
        setPage={setPage}
        data={tabsData}
      />
    </View>
    {
      (page === "Donaciones" && user?.rol === "beneficiario") ? <DonacionBeneficiario setPage={setPage} /> :
      (page === "Donaciones" && user?.rol === "restaurante") ? <DonacionRestaurante setPage={setPage} /> :
      page === "Pendientes" ? <MisDonaciones /> :
      page === "Completadas" && <DonacionesCompletadas />
    }
    </>
  )
}

export default Donations

const styles = StyleSheet.create({
  tabsContainer: {
    paddingHorizontal: 20
  }
})