import React from 'react'
import { View, Text } from 'react-native';

export default class AdminManageStudentInfoScreen extends React.Component{
 
  render(){
    return(
      <View>
        <Text>{`${this.props.route.params.studentCode}`}</Text>
      </View>
    );
  }
}