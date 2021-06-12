import React,{ useEffect, useState } from 'react'
import { View,Text,Image,StyleSheet,TouchableOpacity,TextInput } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
//import * as Sharing from 'expo-sharing';

export default class InstructorCourseOverviewScreen extends React.Component{
  state={
    title:'',
    course_code:'',
    token:'',
    Data: [],
    downloadProgress:0,
    document:''
  }

  AssingmentsShow(){
    this.setState({course_code:'cseii2',token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJjZjgzMjI2ZTJhZjI2Yzg2NDU4NzEiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiczlAZ21haWwuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjMxMDMxNTh9.8smFMDHrhuukCBxTGIMTAIFP8kTjXy-eTGF8HYODLkE'})
		var url = `http://192.168.1.4:3000/courses/course/assignments/${this.state.course_code}/${this.state.title}`;
    const AuthStr = 'Bearer '.concat(this.state.token); 
    axios.get(url, { headers: { Authorization: AuthStr } })
     .then(response => {
         // If request is good...
         this.setState({Data:response.data});
         console.log(this.state.Data)
      })
     .catch((error) => {
         console.log('error ' + error);
      });

    }
 download =()=>{

      fetch(`http://192.168.1.4:3000/courses/course/assignments/assignment/${this.state.course_code}/${this.state.title}`, {
   
        method: "GET",
        headers: {
       
          "Authorization": `Bearer ${this.state.token}`,
        },
      })
      .then(response => response.blob())
       .then(blob => {
        var a = FileSystem.createDownloadResumable(
          `http://192.168.1.4:3000/courses/course/assignments/assignment/${this.state.course_code}/${this.state.title}`,
          FileSystem.documentDirectory + this.state.Data[0].fileName,
          {},
          
        ); try {
          const { uri } =  a.downloadAsync();
          console.log('Finished downloading to ', uri);
          //setDocument(uri);
        } catch (e) {
          console.error(e);
        }       
    })
        .catch((error) => console.log(error));
    }

  
  render(){
    const dataMongo = this.state.Data.map((item, index)=>{
      for(let i=0; i<this.state.Data.length; i++){
			var assignment = [this.state.Data[i].fileName]
      }
			return ( 
			<TouchableOpacity >				
			<Text style={{fontSize:15}} key={index}>{assignment}</Text>
			</TouchableOpacity>
			)
		  })

    return(
      <View style={{flex: 1, backgroundColor: '#9ed3e5'}}>
               <View style={styles.container}>     
                     <TextInput
                      placeholder='title'
                      style={styles.InputText}
                      onChangeText={(title) => this.setState({title})}
                      value={this.state.title}
                      />
                  <TouchableOpacity activeOpacity={0.95} style={styles.button}
                    onPress={ this.AssingmentsShow.bind(this) 
                  }
                    >
                    <Text style={styles.text}>Show Assingments</Text>
                    </TouchableOpacity>          
                   <TouchableOpacity activeOpacity={0.95} style={styles.button}
                    onPress={ this.download.bind(this)}
                    >
                        <Image style={styles.img} source={require('../../assets/download.png')}/>
                        <Text style={styles.text}>Download</Text>
                    </TouchableOpacity>
                    <View>
                      <Text style={{fontSize:25,marginTop:35}}>Assingments</Text>
                      </View>
                      <View >	
                      {dataMongo}
                      </View>
               
                    </View> 
      </View>
    );
  }
}
const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#9ed3e5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:50,
},  
button: {
  flexDirection: 'row', 
  height: 50, 
  width:200,
  backgroundColor: '#10adf5',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:7,
  marginTop:20
},
text: {
  fontSize: 20,
  fontWeight: 'bold',
  color:'black'
},
img:{
width:40,
height:40,
marginRight:20,
},
InputText:
{
height: 50, 
width: 250,
fontSize: 15,
backgroundColor:'white',
borderRadius:5,
paddingLeft:10
}
});