import React from 'react'
import { View,Text,Image,StyleSheet,TouchableOpacity,TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
//import axios from  'axios'
export default class StudentCourseOverviewScreen extends React.Component{
  state = {
    title:'',
    File:{
      name:'',
      size:0,
      type:'',
      uri:''
    }
  }

  selectFile = async() =>{
    const file = await DocumentPicker.getDocumentAsync()
    console.log( file )
    if(file.type === 'success'){
      this.setState({File:file}) 
    }
    else{
      alert('Error:Cannot Select this File')
    } 
  }
 
  uploadFile = () =>{
    var formData = new FormData();
    const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGJlMTA4MTI3ZjQ4NTQ2ZjQ0YTI4M2MiLCJuYW1lIjoiYWJkZWxyaG1hbiIsImVtYWlsIjoiczJAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2MjMwODg3ODl9.p5OQr9R3cMilz75HoerGQQDoHcHwQO4pu-8k27sGWAU'
    //console.log(this.state.filename)  
    //console.log(this.state.title)
    formData.append('upload', {uri: this.state.File.uri
      , name: this.state.File.name, type: 'file/pdf'});
      formData.append(`title`, this.state.title);
      formData.append(`course_code`, `cseii2`);
      fetch(`http://192.168.1.4:3000/courses/course/assignmentUpload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            throw Error(res.status);
          }
          console.log("then data");
        })
        .catch((error) => console.log(error));
  this.setState({File:{name:'',size:0,type:'',uri:''},title:''})
  }
 
  render(){
    return(
      <ScrollView>
      <View style={{flex: 1, backgroundColor: '#9ed3e5'}}>
      <Image style={styles.img_over} source={require('../../assets/assignment.jpg')}/>  
        <Text style={{textAlign:'center',fontSize:36,color:'grey',marginTop:20,fontWeight:'bold',fontStyle:'italic' }}> Assignments</Text>
        <Text style={{textAlign:'center',fontSize:26,color:'#5e5757',paddingTop:40,paddingBottom:80 }}>Please Upload Your Assingment in .Pdf Format
        {'\n'}after filling your Data</Text>     
        <View style={styles.container}>

                    <TextInput
                      placeholder='title'
                      style={styles.InputText}
                      onChangeText={(title) => this.setState({title})}
                      value={this.state.title}
                      />
                      <Text>{'\n'}</Text>                      
                       <Text>{'\n'}</Text>
                   <TouchableOpacity activeOpacity={0.95} style={styles.button}
                    onPress={ this.selectFile.bind(this)}>
                         <Text style={styles.text}>Choose File</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:15,fontWeight:'bold',color:'red'}}>{this.state.File.name}</Text>
                     <Text>{'\n'}</Text>      
                    <TouchableOpacity activeOpacity={0.95} style={styles.button}
                    onPress={ this.uploadFile.bind(this) 
                  }
                    >
                        <Image style={styles.img} source={require('../../assets/698394-icon-130-cloud-upload-512.png')}/>
                        <Text style={styles.text}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView> 
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
  img_over:{
  width:410,
  height:300,
  },
  parent: {
    width: 300,
    height: 500,
    backgroundColor: 'red',
    margin: 50,
},
Button: {
  flexDirection: 'row', 
  height: 50, 
  width:200,
  backgroundColor: '#206a87',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 40,

},
button: {
    flexDirection: 'row', 
    height: 50, 
    width:200,
    backgroundColor: '#206a87',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:7

},
text: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#0f345b'
},
img:{
  width:50,
  height:50,
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