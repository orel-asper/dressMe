import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GetMeData from '../service/GetMeData'

const Shoes = ({navigation}) => {
    return (
        <View style={{ flex: 1 }}>
            <GetMeData type={'shoes'} />
      </View>
    )
}

export default Shoes

const styles = StyleSheet.create({})
