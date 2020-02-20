import React, { Component } from 'react';

class EditUser extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            id : this.props.userEditObject.id,
            name : this.props.userEditObject.name,
            tel : this.props.userEditObject.tel,
            permission : this.props.userEditObject.permission
        }
    }
    


    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name] : value
        });
    }


    saveButton = () => {
        this.props.changeEditUserStatus();

        var info = {};
        info.id = this.state.id;
        info.name = this.state.name;
        info.tel = this.state.tel;
        info.permission = this.state.permission;


        this.props.getUserEditInfo(info);

    }

    render() {
        
        return (
            <div className="col">
                <form>

                    <div className="card text-white bg-warning mb-3 mt-2" >
                        <div className="card-header text-center">Sửa thông tin User</div>
                        <div className="card-body text-primary">
                            <div className="form-group">
                                <input onChange = {(event) => this.isChange(event)} type="text" defaultValue = {this.props.userEditObject.name} name = "name"  className="form-control" placeholder="Tên User" />
                            </div>
                            <div className="form-group">
                                <input onChange = {(event) => this.isChange(event)} type="text" defaultValue = {this.props.userEditObject.tel} name="tel" className="form-control" placeholder="Điện Thoại" />
                            </div>
                            <div className="form-group">
                                <select onChange = {(event) => this.isChange(event)} className="custom-select" defaultValue = {this.props.userEditObject.permission}  name="permission">
                                    <option defaultValue>Chọn Quyền</option>
                                    <option value={1}>Admin</option>
                                    <option value={2}>Moderator</option>
                                    <option value={3}>Normal</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input onClick = {()=>this.saveButton()} type="button" value="Lưu" className="btn btn-block btn-danger" ></input>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default EditUser;