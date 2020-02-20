import React, { Component } from 'react';
import TableDataRow from './TableDataRow';

class TableData extends Component {

    deleteButtonClick = (idUser) => {
        //console.log(idUser);
        this.props.deleteUser(idUser);
    }

    mappingDataUser = ()=>{
        return  this.props.dataUserProps.map((value,key) =>(
                    <TableDataRow key = {key}
                                  stt = {key+1}
                                  id = {value.id}
                                  userName = {value.name}
                                  tel = {value.tel}
                                  permission = {value.permission}

                                  editFuncClick ={(user) =>this.props.editFunc(value)}
                                  changeEditUserStatus = {()=>this.props.changeEditUserStatus()}

                                  deleteButtonClick = {(idUser)=>this.deleteButtonClick(idUser)}
                    />
        ))
    }


    render() {
        // console.log(this.props.dataUserProps);
        return (
            <div className="col">
                <table className="table table-striped table-inverse table-hover">
                    <thead className="thead-inverse">
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Điện Thoại</th>
                            <th>Quyền</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody> 

                       {this.mappingDataUser()}
                       
                    </tbody>
                </table>
            </div>

        );
    }
}

export default TableData;