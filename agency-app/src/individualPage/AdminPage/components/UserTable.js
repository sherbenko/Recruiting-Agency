import React, {useState} from 'react'

import ModalAgreeDelete from '../components/ModalAgreeDelete';
export const UserTable = ({users,editRow,deleteUser,loading,currentUserEmail}) => {
    let i =1;
    const [openDeleteModal,setOpenDeleteModal] =useState(false);

    const handleDeleteUser = id => {
        let answer = window.confirm("Are you sure?")
        if(answer){
            deleteUser(id)
        }
    }
const toggleDeleteModal = ()=>setOpenDeleteModal(!openDeleteModal);
    const handlerEditUser =(user) =>{
        editRow(user);
    }



    if(loading) {
        return (
            <div className="spinner-border text-primary spinner" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    return (

        <table className="table">
            {
                openDeleteModal &&
                    <ModalAgreeDelete toggleDeleteModal={toggleDeleteModal}/>
            }

            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>

                <th scope="col">Agency</th>
                <th scope="col">Roles</th>

                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {users.length > 0 ? (
                users
                    .filter(us=>us.email!==currentUserEmail)
                    .map(user => (
                    <tr key={user.id}>
                        <td>{i++}</td>
                        <td>{user.email}</td>
                        {/*fix it*/}
                        <td>{user.agencyName}</td>
                        <td>{user.roles.map(role=>
                            <p style={{color:"black"}} key={role.id}>{role.name}</p>)}
                        </td>
                        <td>


                            <button  style={{marginRight:'10px'}} className="btn btn-dark"
                                     onClick={() => {handlerEditUser(user)}}

                            >
                                Edit
                            </button>
                            <button className="btn btn-dark"
                                    onClick={() => handleDeleteUser(user.id)}>Delete</button>

                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={3}>No users</td>
                </tr>
            )}
            </tbody>
        </table>

    )
}
