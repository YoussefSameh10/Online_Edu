import React from 'react'
import { Keyboard } from 'react-native'
import { Button, TouchableOpacity, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { Icon } from 'react-native-elements'
import {io} from 'socket.io-client'
import Moment from 'moment'
import {localhost} from '../../Constants/numbers'

const socket = io(`http://${localhost}:8000`)

export default class StudentCourseChatScreen extends React.Component{
  
  state = {
    messages: [],
    canSend: false,
    typeMessage: '',
    connect: true,
    visibleTimeNewMessage: false,
    visibleTimeOldMessage: false,
  }


  componentDidMount(){
    if(this.state.connect){
      //this.setState({socket: io(`http://192.168.1.5:8000`), connect: false}, this.init)
      this.init()
    }
  }

  init = () => {

    const username = this.props.user.name
    const room = this.props.courseCode
    
    socket.emit('join', {username, room}, () => {
    })
    socket.emit('chatHistory', room)
    socket.on('returnChatHistory', (data) => {
      this.setState({messages: [...data.slice().reverse()]})
    })
    socket.on('message', (message) => {
      this.setState({messages: [message, ...this.state.messages]})
    })
  }

  renderItem = ({index}) => (
    
    this.state.messages[index]._id ?
      <View style={styles.message}>
        <Text 
          style={[
            styles.senderName, 
            this.state.messages[index].sendername === this.props.user.name ? 
              {alignSelf: 'flex-start'} : 
              {alignSelf: 'flex-end'}
          ]}
        >
          {this.state.messages[index].sendername !== this.props.user.name ? this.state.messages[index].sendername : ``}
        </Text>
        <View>
          <TouchableOpacity onPress={() => {this.setState({visibleTimeNewMessage: !this.state.visibleTimeNewMessage})}}>
            <Text
              style={[
                styles.messageText, 
                this.state.messages[index].sendername === this.props.user.name ? 
                  {backgroundColor: '#66f', alignSelf: 'flex-start'} : 
                  {backgroundColor: '#ddd', alignSelf: 'flex-end'}
              ]}
            >
              {this.state.messages[index].messagetext}
            </Text>
          </TouchableOpacity>
        </View>
        <Text 
          style={[
            styles.sendingTime, 
            this.state.messages[index].sendername === this.props.user.name ? 
              {alignSelf: 'flex-start'} : 
              {alignSelf: 'flex-end'}
          ]}
        >
          {this.state.messages[index].sendingtime}
        </Text>
        
      </View> :

      <View style={styles.message}>
      <Text 
        style={[
          styles.senderName, 
          this.state.messages[index].username === this.props.user.name ? 
            {alignSelf: 'flex-start'} : 
            {alignSelf: 'flex-end'}
        ]}
      >
        {this.state.messages[index].username !== this.props.user.name ? this.state.messages[index].username : ''}
      </Text>
      <TouchableOpacity onPress={() => {
          console.log(this.state.visibleTimeOldMessage)
          this.setState({visibleTimeOldMessage: !this.state.visibleTimeOldMessage})}}>
        <Text
          style={[
            styles.messageText, 
            this.state.messages[index].username === this.props.user.name ? 
              {backgroundColor: '#66f', alignSelf: 'flex-start'} : 
              {backgroundColor: '#ddd', alignSelf: 'flex-end'}
          ]}
        >
          {this.state.messages[index].text}
        </Text>
      </TouchableOpacity>
      
      <Text 
        style={[
          styles.sendingTime, 
          this.state.messages[index].username === this.props.user.name ? 
            {alignSelf: 'flex-start'} : 
            {alignSelf: 'flex-end'}
        ]}
      >
        {Moment(this.state.messages[index].createdAt).format(' DD:MMM:YYYY h:mm a')}
      </Text>

      </View>
  )

  checkEnableSend = () => {
    if(this.state.typeMessage.length > 0){
      this.setState({canSend: true})
    }
    else{
      this.setState({canSend: false})
    }
  }

  handleTextChange = (message) => {
    this.setState({typeMessage: message}, this.checkEnableSend)
    
  }

  handleSend = () => {
    this.setState({
      typeMessage: ''
    }, this.checkEnableSend)

    Keyboard.dismiss()


    socket.emit('sendMessage', this.state.typeMessage, (error) => {
      // if(error){
      //   return console.log(error)
      // }
      
    })
  }

  render(){
    return(
      <View style={styles.container}>
        {console.log('data', this.state.messages)}
        <FlatList
          inverted
          data={this.state.messages}
          renderItem={this.renderItem}
          keyboardShouldPersistTaps='handled'
          keyExtractor={item => item._id} 
          style={styles.scroller} 
        />
        <View style={styles.fixedBottom}>
          <TextInput
            placeholder='Type a message'
            value={this.state.typeMessage}
            onChangeText={this.handleTextChange} 
            style={styles.inputBox}
          />
          <TouchableOpacity
              onPress={this.handleSend}
              disabled={!this.state.canSend}
              style={[
                styles.sendButton, 
                this.state.canSend ? {backgroundColor: '#66f'} : {backgroundColor: '#ccc'}
              ]}
            >
              <Icon 
                name='send'
                color={'#fff'}  
                style={styles.internalSend}
              />
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'flex-end',},
  inputBox: {flex: 1, fontSize: 18, marginRight: 8, paddingHorizontal: 8, height: 40, borderRadius: 20, backgroundColor: '#fff'},
  fixedBottom: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  scroller: {marginBottom: 16,},
  message: {marginBottom: 8},
  messageText: {flexDirection: 'row', fontSize: 16, paddingVertical: 4, paddingHorizontal: 8, maxWidth: '60%', borderRadius: 20,},
  senderName: {marginLeft: 4, fontSize: 14, color: '#444'},
  sendingTime: {marginLeft: 4, fontSize: 12, color: '#444'},
  sendButton: {borderRadius: 20,},
  internalSend: {padding: 4,}
});
