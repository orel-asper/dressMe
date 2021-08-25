import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GetMeData from '../service/GetMeData'

const Shirt = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <GetMeData type={'shirts'}/>
      </View>
    )
}

export default Shirt

const styles = StyleSheet.create({})
