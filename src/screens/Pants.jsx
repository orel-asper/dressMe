import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GetMeData from '../service/GetMeData'

const Pants = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <GetMeData type={'pants'}/>
      </View>
    )
}

export default Pants

const styles = StyleSheet.create({})
