import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Icon, Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { url } from '../Constants/numbers';

export default class CourseCard extends React.Component{

	state={
		imagesArr: [
			require('../assets/courses3.jpg'),
			require('../assets/courses3.jpg'),		
			require('../assets/courses3.jpg'),		
		],
		image: ''
		
	}

	handleSelect = async() => {

		try{
			const response = await fetch(`${url}/courses/course/${this.props.courseCode}`,{
				method: 'GET',
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + this.props.userToken,        
				},
			})
			const result = await response.json()
			if(response.status === 200){
				this.props.navigation.navigate(`${this.props.userType}CourseNav`, {
					user: this.props.user,
					userToken: this.props.userToken,
					course: result.course,
					instructorName: result.instructor_name
				})
			}
			else if(response.status === 500){
				Toast.show('Server error')
			}
			else{
				Toast.show(result)
			}
			
			
		} catch(e){
			console.log(e)
		}
		
	}

	getRandomImage = () => {
		

		this.setState({image: imagesArr[Math.floor(Math.random() * arr.length)]}) 
	}

  render(){
		const image1 = require('../assets/courses1.jpg')
		const image2 = require('../assets/courses2.jpg')
		const image3 = require('../assets/courses3.jpg')
		const imagesArr = [image1, image2, image3]

    return(
      <TouchableOpacity 
				onPress={this.handleSelect}
			>
				<Card containerStyle={{shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 5,
					},
					shadowOpacity: 0.36,
					shadowRadius: 6.68,
					elevation: 11,
					marginVertical: 20
				}}>
					<Card.Title style={styles.title}>
						{`${this.props.courseName} ${this.props.courseCode}`}
					</Card.Title>
					<Card.Image source={imagesArr[this.props.index%3]} />
					
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