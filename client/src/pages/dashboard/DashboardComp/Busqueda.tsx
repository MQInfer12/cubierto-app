import React from 'react'
import icon from "../../../assets/dash/ri_search-line.svg"
import { BusquedaStyle } from '../../../styles/compStyleDash'
const Busqueda = () => {
  return (
    <BusquedaStyle>
       <img src={icon} alt="" />
        <input type="text" placeholder='Search'/>
     </BusquedaStyle>
  )
}

export default Busqueda