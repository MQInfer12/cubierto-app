import React from 'react'
import { Content2 } from '../../styles/page2Style'
import verduras from "../../assets/page2/Frame 1.png"
const SectionAyuda = () => {
  return (
    <Content2 className='hidden show'>
      <img src={verduras} alt="" />
      <div><h3>¿De que manera 
se brinda nuestra ayuda?</h3>
<p>como ayudamos a no desperdiciar comida</p>
</div>
    </Content2>
  )
}

export default SectionAyuda
