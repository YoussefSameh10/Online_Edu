import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FlatList, } from 'react-native-gesture-handler';
import { Table, Row, Cell, } from 'react-native-table-component';
import { Icon } from 'react-native-elements'
import Dialog from "react-native-dialog";
import Colors from '../Constants/colors'
export default class UsersTable extends React.Component{
  
  state = {
    dialogVisibility: false,
    indexToBeDeleted: -1,
  }

  deleteIcon = (index) => (
    <TouchableOpacity 
      onPress={() => {
        this.setState({
          dialogVisibility: true,
          indexToBeDeleted: index
        })
      }}
    >
      <Icon 
        name='trash-alt'
        type='font-awesome-5' 
        
      />
    </TouchableOpacity>
  );

  renderItem = ({item, index}) => (

    <Row 
      data={
        Object.keys(item).map((cellData, cellIndex) => (
          <Cell
            onPress={() => {
              this.props.navigation.navigate(`adminView${this.props.userType}InfoScreen`, {
                userName: this.props.users[index].name,
                userCode: this.props.users[index].code,
                userEmail: this.props.users[index].email,
                userYear: this.props.users[index].year,
              })
            }}
            key={cellIndex} 
            data={
              cellIndex === 0 ? item['name']  
              :cellIndex === 1 ? item['code'] 
              : cellIndex === 2 ? this.deleteIcon(index)
              : null
          }
            textStyle={styles.text}
          />
        ))
      }
      style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
      flexArr={[0.45, 0.45, 0.1]}
    />
  );

  handleCancel = () => {
    this.setState({dialogVisibility: false})
  };

  handleDelete = () => {
    //Delete indexToBeDeleted
    indexToBeDeleted = -1
    this.setState({dialogVisibility: false})
  };

  render(){
    return(
      <View>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row 
            data={this.props.attributes} 
            style={styles.header} 
            textStyle={styles.headerText}
            flexArr={[0.45, 0.45]}
          />
        </Table>

        <Dialog.Container visible={this.state.dialogVisibility}>
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button 
            label="Cancel" 
            onPress={this.handleCancel} 
            style={styles.dialogCancelButton}
          />
          <Dialog.Button 
            label="Delete" 
            onPress={this.handleDelete} 
            style={styles.dialogDeleteButton}
          />
        </Dialog.Container>

        
        <FlatList 
          data={this.props.usersShownData}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: { height: 40, },
  headerText: { margin: 6, fontSize: 20, fontWeight: 'bold' },
  text: { margin: 6, },
  evenRow: { flexDirection: 'row', backgroundColor: '#eef', height: 60, },
  oddRow: {flexDirection: 'row', backgroundColor: '#fff', height: 60, },
  dialogDeleteButton: {color: 'red'},
  dialogCancelButton: {color: Colors.primary_color}
});
