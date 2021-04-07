import React from 'react'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native';

export default class CustomDrawer extends React.Component{
    render(){
      return(
        <DrawerContentScrollView {...this.props}>
          <View style={styles.container}>
            <Image 
              source={require('../assets/login_img1.png')} 
              resizeMode='center' 
              style={styles.headerImage} 
            />
          </View>
          <DrawerItemList {...this.props} />
        </DrawerContentScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: 200,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: 10
    },

    headerImage: {
      height: '100%',
    }
  })