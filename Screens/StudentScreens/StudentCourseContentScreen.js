import React from 'react'
import { StyleSheet, View, Button, Text, ScrollView, addLessonModal, FlatList } from 'react-native';
import TreeView from 'react-native-final-tree-view';
import * as DocumentPicker from 'expo-document-picker';
import { Icon } from 'react-native-elements'
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../Constants/colors';
import {url} from '../../Constants/numbers'
import { lessonsToTree } from '../../Constants/Functions';
import * as Linking from 'expo-linking';
import { Modal } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import PDFReader from 'rn-pdf-reader-js'


async function upload() {
  try{
    const file = await DocumentPicker.getDocumentAsync({type: 'application/pdf'})
    if(file.type === 'success'){
      return file
    }
    else{
      return {}
    }
  } catch(e){
    return
  }
}

export default class StudentCourseContentScreen extends React.Component{
  
  state={
    lessons: this.props.course.lessons,
    visibleAddLessonModal: false,
    visibleYoutubeModal: false,
    lessonTitle: '',
    youtubeLink: '',
    enableAdd: false,
    validFile: false,
    loading: false,
    loadingPdf: true,
    file: {},
    fileToSend: {},
    videoID: ''
  }
  componentDidMount(){
    this.formatLessons()
  }

  formatLessons = () => {
    this.setState({lessons: [...this.state.lessons.map(lessonsToTree)]})
  }

  handleLessonTitleUpdate = lessonTitle => {
    this.setState({lessonTitle}, this.validateForm)
  }

  handleYoutubeLinkUpdate = youtubeLink => {
    this.setState({youtubeLink}, this.validateForm)
  }

  validateForm = () => {
    if(this.state.lessonTitle.length > 0 && Object.keys(this.state.file).length !== 0){
      this.setState({enableAdd: true})
    }
    else{
      this.setState({enableAdd: false})
    }
  }
  
  refreshLessons = async() => {
    try{
			const response = await fetch(`${url}/courses/course/${this.props.course.code}`,{
				method: 'GET',
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + this.props.userToken,        
				},
			})
			const result = await response.json()
      console.log('result', result)
			if(response.status === 200){
				this.setState({lessons: result.course.lessons}, this.formatLessons)
			}
			else if(response.status === 500){
				Toast.show('Server error')
			}
			else{
				Toast.show(result)
			}
		} catch(e){
      this.setState({loading: false})
      Toast.show('An error occured. Please try again later')
		}
  }

  sendFile = async() => {
    this.setState({loading: true})
    var formData = new FormData()
    const file = this.state.fileToSend
    formData.append('upload', file)
    formData.append('lesson_title', this.state.lessonTitle)
    formData.append('course_id', this.props.course._id)  
    if(this.state.youtubeLink){
      formData.append('video_url', this.state.youtubeLink)    
    }
    try{
      const response = await fetch(`${url}/courses/course/lessonsUpload`,{
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + this.props.userToken,
        },
        body: formData
      })
      const result = await response.json()
      if(response.status === 200){
        this.refreshLessons()
      }
      else if(response.status === 403){
        Toast.show(result)
      }
      
      else{
        Toast.show('Server error')
      }
      this.setState({loading: false, visibleAddLessonModal: false, lessonTitle: '', youtubeLink: '', enableAdd: false,  file: {}})
    }catch(e) {
      this.setState({loading: false, visibleAddLessonModal: false, lessonTitle: '', youtubeLink: '', enableAdd: false,  file: {}})
      Toast.show('An error occured. Please try again later')
    }
  }
  
  handleUpload = async() => {
    this.setState({file: await upload()}, () => {
      if(Object.keys(this.state.file).length !== 0){
        this.setState({validFile: true, loading: true})
      }
      else{
        this.setState({validFile: false, loading: false})
      }
      const { name, uri } = this.state.file
      
      const file = {
        uri: uri,
        name: name,
        type: 'file/pdf',
      }
      this.setState({fileToSend: file, loading: false})
      this.validateForm()
    })
  }

  createLesson = () => {
    this.setState({visibleAddLessonModal: false})
  }

  renderNode = ({node, level, isExpanded, hasChildrenNodes}) => {
    if(level===2 && node.name==='Preview'){
      return(
        <View style={{alignSelf: 'flex-start', marginLeft: 25*level, marginBottom: 16,}}>
          <Icon 
            name='file'
            type='font-awesome'
            color={Colors.primary_color}
          />
        </View>
      )
    }
    else if(level===2 && node.name==='Download'){
      return(
        <View style={{alignSelf: 'flex-start', marginLeft: 25*level, marginBottom: 16,}}>
          <Icon 
            name='download'
            type='font-awesome'
            color={Colors.primary_color}
          />
        </View>
      )
    }
    else if(level===2 && node.name==='Player'){
      return(
        <View style={{alignSelf: 'flex-start', marginLeft: 25*level, marginBottom: 16,}}>
          <Icon 
            name='movie'
            color={Colors.primary_color}
          />
        </View>
      )
    }
    else if(level===2 && node.name==='Youtube'){
      return(
        <View style={{alignSelf: 'flex-start', marginLeft: 25*level, marginBottom: 16,}}>
          <Icon 
            name='youtube'
            type='font-awesome'
            color={Colors.primary_color}
          />
        </View>
      )
    }
    else{
      return (
        <View style={{alignSelf: 'flex-start', marginLeft: 25*level, marginBottom: 16, flexDirection: 'row', alignItems: 'center'}}>
          <Icon 
            name={isExpanded ? 'chevron-down' : 'chevron-right'}
            type='font-awesome'
            color='#000'
            size={16}
          /> 
          <Text style={{fontSize: 20, marginLeft: 8}}>
            {node.name}
          </Text>
        </View>
      )
    }
    
  }

  onNodePress = ({node, level}) => {
    if(level===2 && node.name==='Preview'){
      this.setState({pdfSrc: node.fileName}, () => {
        this.setState({visiblePdf: true, loadingPdf: true})
      })
    }
    else if(level===2 && node.name==='Download'){
      this.setState({pdfSrc: node.fileName}, () => {
        this.setState({visiblePdf: true, loadingPdf: true})
      })
    }
    else if(level===2 && node.name==='Player'){
      this.setState({videoID: node.videoID}, () => {
        this.setState({visibleYoutubeModal: true})
      })
    }
    else if(level===2 && node.name==='Youtube'){
      console.log(node.videoID)
      Linking.openURL(`https://www.youtube.com/watch?v=${node.videoID}`)
    }
  }


  render(){
    return(
      this.state.visibleYoutubeModal ? 
      (<View style={styles.videoView}>
        
        <YoutubePlayer
          height={300}
          play={true}
          videoId={this.state.videoID}
          onChangeState={() => {}}
          webViewStyle={{marginTop: 80}}
        />
        <View style={styles.closeVideoButton}>
          <TouchableOpacity
            onPress={() => {this.setState({visibleYoutubeModal: false})}}
          >
            <Icon 
              name='close'
              color='#fff'
            />
          </TouchableOpacity>
        </View>
      </View>)
      : this.state.visiblePdf ?(
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Spinner visible={this.state.loadingPdf} />
          <PDFReader
            source={{
              uri: 'https://arxiv.org/pdf/quant-ph/0410100',
            }}
            onLoad={() => {this.setState({loadingPdf: false})}}
          />
        <TouchableOpacity 
          style={{height: 50, justifyContent: 'center', backgroundColor: '#555',}}
          onPress={() => {this.setState({visiblePdf: false})}}
        >
          <Icon name='close' color='#fff' size={24}/>
        </TouchableOpacity>
      </View>
      ) :
      <View style={styles.container}>
        <Spinner visible={this.state.loading} />
        <ScrollView>
          <TreeView 
            data={this.state.lessons}
            renderNode={this.renderNode}
            onNodePress={this.onNodePress}
            getCollapsedNodeHeight={({level}) => {}}
          />
        </ScrollView>
      </View>
         
    );
  }
}


const styles = StyleSheet.create({
  container: {height: '100%', padding: 16, backgroundColor: '#fff'},
  input: {borderBottomWidth: 1, marginBottom: 16, width: '80%', position: 'relative'},
  formButton: {marginVertical: 8},
  videoView: {height: '100%', padding: 8, backgroundColor: '#fff'},
  closeVideoButton: {backgroundColor: Colors.primary_color, width: 50, height: 50, borderRadius: 30, alignSelf: 'center', justifyContent: 'center', marginVertical: 4},
});
