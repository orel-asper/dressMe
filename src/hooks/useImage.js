import React , {useState ,useEffect} from 'react'
import { Card } from 'react-native-paper';
import P1 from '../../assets/pants-1.png'
import P2 from '../../assets/pants-2.png'
import P3 from '../../assets/pants-3.png'
import S1 from '../../assets/shirt-1.png'
import S2 from '../../assets/shirt-2.png'
import S3 from '../../assets/shirt-3.png'
import SH1 from '../../assets/shoes-1.png'
import SH2 from '../../assets/shoes-2.png'
import SH3 from '../../assets/shoes-3.png'

let clothes = [
      { code: "P1",component: P1 },
      { code: "P2",component: P2 },
      { code: "P3",component: P3 },
      { code: "S1",component: S1 },
      { code: "S2",component: S2 },
      { code: "S3",component: S3 },
      { code: "SH1",component: SH1 },
      { code: "SH2",component:SH2 },
      { code: "SH3",component: SH3 },
]

const getClothesByCode = (code) => {
  return clothes.find((clothes) => clothes.code === code);
},

    getClothesComponentByCode = (code) => {
  return getClothesByCode(code).component;
},

 UseImage = ({ type }) => {
     const [img, setImg] = useState()
            
useEffect(() => {
     if (typeof(type) == 'undefined') return;
  setImg(getClothesComponentByCode(type))
}, [type])

    return (
        <>
            <Card.Cover source={img} />
        </>
    )
}

export default UseImage
