import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Colors from '../Constants/colors';

export default class ProfileAvatar extends React.Component{
  render(){
    return(
      <TouchableOpacity onPress={() => {this.props.navigation.navigate(`${this.props.userType}ProfileScreen`)}}>
        <View style={styles.container}>
          <Avatar 
            rounded 
            title='AD' 
            overlayContainerStyle={styles.avatar} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 10
  },
  avatar:{
    backgroundColor: Colors.primary_color
  }
})