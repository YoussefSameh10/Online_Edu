import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import CourseCard from '../Components/CourseCard';
import { View, Text, StyleSheet } from 'react-native'
import { Card, Icon, Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../Constants/colors';


export default class StudentCoursesScreen extends React.Component{

  render(){
    return(
      <ScrollView style={{flex: 1, backgroundColor: Colors.primary_color}}>
        <CourseCard navigation={this.props.navigation}/>
        <CourseCard navigation={this.props.navigation}/>
        <CourseCard navigation={this.props.navigation}/>
        <CourseCard navigation={this.props.navigation}/>
        <CourseCard navigation={this.props.navigation}/>        
      </ScrollView>
    );
  }
} 

