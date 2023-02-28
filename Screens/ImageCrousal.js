import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import ImageSlider from 'react-native-image-slider';

export default function ImageCrousal() {
    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
     <ImageSlider style={{height:responsiveHeight(40),width:responsiveWidth(100)}} images={[
    'http://placeimg.com/640/480/apple',
    'http://placeimg.com/640/480/any',
    'http://placeimg.com/640/480/any'
  ]}/>
        </View>
    )
}