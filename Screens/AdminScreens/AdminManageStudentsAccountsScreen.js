import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Cell, Rows } from 'react-native-table-component';
import { Icon } from 'react-native-elements'
import DropDownPicker from 'react-native-dropdown-picker';

export default class AdminManageStudentsAccountsScreen extends React.Component{
  
  state={
    attributes: ['NAME', 'CODE', ],
    data: [
      
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],
      ['Youssef Sameh', '1234567890', ''],

    ]
  }
  render(){

    const element = () => (
      <TouchableOpacity onPress={() => {}}>
        <Icon 
          name='trash-alt'
          type='font-awesome-5' 
          
        />
      </TouchableOpacity>
    );
    return(
      <View style={styles.container}>
        <View style={styles.fixedView}>
          <TextInput 
            placeholder={'Search'}
            
            style={styles.search}
          />
          <View flexDirection='row' style = {styles.menus}>
            <DropDownPicker
              items={[
                  {label: 'Year 0', value: '0',},
                  {label: 'Year 1', value: '1', },
                  {label: 'Year 2', value: '2', },
                  {label: 'Year 3', value: '3', },
                  {label: 'Year 4', value: '4', },
              ]}
              //defaultValue={this.state.country}
              placeholder={'Year'}
              containerStyle={{ width: '45%', height: 40}}
              style={{backgroundColor: '#fafafa', }}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => this.setState({
                  //country: item.value
              })}
            />
            <DropDownPicker
              items={[
                  {label: 'Electrical', value: '0',},
                  {label: 'Mechanical', value: '1', },
                  {label: 'Architecture', value: '2', },
                  {label: 'Civil', value: '3', },
                  
              ]}
              //defaultValue={this.state.country}
              placeholder={'Department'}
              containerStyle={{ width: '45%', height: 40}}
              style={{backgroundColor: '#fafafa', }}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => this.setState({
                  //country: item.value
              })}
            />
          </View>
        </View>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={this.state.attributes} style={styles.header} textStyle={styles.headerText}/>
        </Table>
        <ScrollView>
          <Table>
            {
              this.state.data.map((rowData, index) => (
                <TableWrapper 
                  key={index} 
                  style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell
                      onPress={() => {}}
                      width={cellIndex === 2 ? '10%': '45%'}
                      key={cellIndex} 
                      data={cellIndex === 2 ? element() : cellData} 
                      textStyle={styles.text}/>
                  ))
                }
                </TableWrapper>
              ))
            }
          </Table>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { height: 40, },
  headerText: { margin: 6, fontSize: 20, fontWeight: 'bold' },
  text: { margin: 6, },
  evenRow: { flexDirection: 'row', backgroundColor: '#fff', height: 40, },
  oddRow: {flexDirection: 'row', backgroundColor: '#ddd', height: 40, },
  menus: {justifyContent: 'space-around'},
  fixedView: {marginBottom: 20},
  search: {alignSelf: 'center', marginBottom: 16, borderBottomWidth: 1, width: '90%', paddingLeft: 8},
});
