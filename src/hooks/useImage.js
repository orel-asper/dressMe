import React from 'react'
import { StyleSheet, Image } from 'react-native'

let dummyData = {
    pants: [
        `../../assets/pants-1.jpeg`,
        `../../assets/pants-2.jpeg`,
        `../../assets/pants-3.jpeg`
    ],
    shirt: [
        `../../assets/shirt-1.jpeg`,
        `../../assets/shirt-2.jpeg`,
        `../../assets/shirt-3.jpeg`,
    ],
    shoes: [
        `../../assets/shoes-1.jpeg`,
        `../../assets/shoes-2.jpeg`,
        `../../assets/shoes-3.jpeg`,
    ],
}


const UseImage = ({ type }) => {

    return (
        <>
            <Image style={styles.img}
                source={require(pants)} />
        </>
    )
}

export default UseImage

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
    }
})
