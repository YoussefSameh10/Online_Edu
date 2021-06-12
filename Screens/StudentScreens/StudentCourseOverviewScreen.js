import React from 'react'
import { View ,FlatList,Text,Image,StyleSheet,ScrollView} from 'react-native';
import Colors from '../../Constants/colors';
import UsersTable1 from '../../Components/UsersTable1';


export default class StudentCourseOverviewScreen extends React.Component{
  state={
    attributes: ['Work', 'Grade'],
    instructorShownData: [
      ['Assignments', '5 Marks'],
      ['Quizzes', '5 Marks'],
      ['Mid-Term', '15 Marks'],
      ['Project','5 Marks'],
      ['Final-Exam', '90 Marks']
    ],
  }
  
  render(){
    return(
      <ScrollView>
      <View style={{flex: 1, backgroundColor: 'white'}}>
       <Image source={require('../../assets/y165_1_front.png')} style={{flex: 1,
    resizeMode: 'cover', width: '100%', height: 150,position:'relative'}}></Image>
       <View style={styles.container1}>
       <UsersTable1
          userType={'instructor'}
          attributes={this.state.attributes} 
          usersShownData={this.state.instructorShownData} 
          navigation={this.props.navigation} 
        />
        </View>
      <View >
        <Text style={styles.total}>Total: 125 Marks</Text>
        </View>  
      </View>
      </ScrollView >
    );
  }
}
const styles = StyleSheet.create({  
 

container1: {
 padding:4,
 textAlign:'left',
 marginTop:20

},
total:{
  backgroundColor:'grey',
  textAlign:'center',
  fontWeight:'bold',
  fontSize:15
}
});
