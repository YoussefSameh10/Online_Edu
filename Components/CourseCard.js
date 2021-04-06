import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Icon, Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CourseCard extends React.Component{

  render(){
    return(
      <TouchableOpacity onPress={() => {this.props.navigation.navigate('studentCourseNav')}}>
				<Card>
					<Card.Title style={styles.title}>Image Processing CSE444</Card.Title>
					<Card.Image source={require('../assets/login_img1.png')} />
					<View style={styles.instructor}>
						<Text style={styles.instructorText}>
							Prof. Opera
						</Text>
					</View>
      	</Card>
			</TouchableOpacity>
    );      
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold', 
    fontSize: 24
  },

	instructor: {
		marginBottom: 10, 
		alignItems: 'center'
	},
	instructorText: {
		fontSize: 18
	}
	
})