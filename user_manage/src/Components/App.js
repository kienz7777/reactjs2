import React, { Component } from 'react';

import './../App.css';
import Header from './Header';
import Search from './Search';
import TableData from './TableData';
import AddUser from './AddUser';

import Data from './Data.json';


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      hienThiForm : false,
      data : [],
      searchText : '',
      editUserStatus : false,
      userEditObject : {}
    }
  }
  
  
  UNSAFE_componentWillMount() { //trước khi vào render
    
    if(localStorage.getItem('userData') === null)
    {
      localStorage.setItem('userData',JSON.stringify(Data));//convert array to object
    }
    else{
      var temp = JSON.parse(localStorage.getItem('userData'));//convert object to array

      this.setState({
        data : temp
      });
    }
      
    
  }
  
  

  doiTrangThai = ()=>{
    console.log("h2");

   this.setState({
     hienThiForm : !this.state.hienThiForm
   });
  }


  getTextSearch = (dl) =>{
    console.log("dữ liệu nhận được : " + dl);

    this.setState({
      searchText : dl
    });

    
  }


  getNewUserData = (name,tel,permission) => {
    console.log("ôkoko");

    const uuidv1 = require('uuid/v1');

    var item = {};
    item.id = uuidv1();
    item.name = name;
    item.tel = tel;
    item.permission = permission;

    console.log(item);
    var items = this.state.data;
    items.push(item);

    this.setState({
      data : items
    });

    //day du lieu vao localStorage
    localStorage.setItem('userData',JSON.stringify(items));
  }
  


  editUSer = (user) => {
    console.log("please");
    console.log(user);

    this.setState({
      userEditObject : user
    });
  }

  changeEditUserStatus = () => {
    this.setState({
        editUserStatus : !this.state.editUserStatus
    });
  }


  getUserEditInfoApp = (info) => {

    //console.log(typeof info.id);
    //console.log(typeof info.permission);  // string

    this.state.data.forEach((value,key) => {
      
      if(value.id === info.id)
      {
        
        value.name = info.name;
        value.tel = info.tel;       
        value.permission = parseInt(info.permission);
        
      }
      return key;

    })

    //day du lieu vao localStorage
    localStorage.setItem('userData',JSON.stringify(this.state.data));
  }

  deleteUser = (idUser) => {
    //console.log(typeof idUser);
    
    var tempData = this.state.data.filter(item => item.id !== idUser);
    
    this.setState({
      data : tempData
    });

    //day du lieu vao localStorage
    localStorage.setItem('userData',JSON.stringify(tempData));
  }


  render() {

    var ketqua = [];
   
    var text = this.state.searchText;

    this.state.data.forEach((item)=>{
      var changeUp = item.name.toUpperCase();
      var changeLow = item.name.toLowerCase();

      //const textUp = text.toUpperCase();
      
      if( (changeUp.indexOf(text) !== -1) || (changeLow.indexOf(text) !== -1) || (item.name.indexOf(text) !== -1))
      {
        ketqua.push(item);
      }
    })

    //console.log(ketqua);

    return (
      <div>
        <Header/>

        <div className="searchForm">
          <div className="container">
            <div className="row">

                <Search getUserEditInfoApp = {(info)=>this.getUserEditInfoApp(info)}
                        userEditObject = {this.state.userEditObject}
                        changeEditUserStatus = {()=>this.changeEditUserStatus()} 
                        editUserStatus = {this.state.editUserStatus} 
                        ketNoi = {()=>this.doiTrangThai()}  
                        hienThi = {this.state.hienThiForm}   
                        getText = {(dl)=>this.getTextSearch(dl)}>
                </Search>

                <TableData deleteUser = {(idUser)=> this.deleteUser(idUser)}
                          changeEditUserStatus = {()=>this.changeEditUserStatus()} 
                          editFunc = {(user) => this.editUSer(user)}   
                          dataUserProps = {ketqua}/>
                <AddUser add = {(name,tel,permission) => this.getNewUserData(name,tel,permission)}   hienThi = {this.state.hienThiForm}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default App;
