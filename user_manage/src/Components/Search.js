import React, { Component } from 'react';
import EditUser from './EditUser';

class Search extends Component {



    hienThiNut = ()=>{
        if(this.props.hienThi === true)
        {
            return <div className="btn btn-block btn-outline-secondary mt-3" onClick = {()=>this.props.ketNoi()}>Đóng lại</div>;
         }                                                                              // {this.props.ketNoi}
        else{
            return <div className="btn btn-block btn-outline-info mt-3"  onClick = {()=>this.props.ketNoi()}>Thêm mới</div>;
        }
    }


    constructor(props) {
        super(props);
        
        this.state = {
            tempValue : '',
            userObj : {}
        }
    }
    

    isChange = (event)=>{

        console.log(event.target.value);

        this.setState({
            tempValue : event.target.value
        });

        this.props.getText(this.state.tempValue);
    }


    isShowEditForm = ()=>{
        if(this.props.editUserStatus === true)
        {
            return <EditUser getUserEditInfo = {(info) =>this.getUserEditInfo(info)}
                            userEditObject = {this.props.userEditObject} 
                            changeEditUserStatus = {() => this.props.changeEditUserStatus()}/>
        }
        
    }

    getUserEditInfo = (info) => {
        this.setState({
            userObj : info
        });

        this.props.getUserEditInfoApp(info);
    }
    
    render() {
        return (
            <div className="col-12">

                <div className="row">
                   
                    {this.isShowEditForm()}
                   
                </div>
               

                <div className="form-group">
                    <div className="btn-group ">
                        <input type="text" onChange = {(event) => this.isChange(event)} className="form-control"  placeholder="Nhập từ khóa" style={{width:576}}/>
                        <div className="btn btn-info" onClick = {(dl)=>this.props.getText(this.state.tempValue)}>Tìm</div>
                    </div>

                    {
                        this.hienThiNut()
                    }
                </div>
                <hr/>
            </div>
           
        );
    }
}

export default Search;