import React, {useState,useEffect} from "react"


export default function SideBlock(props){
    const [users,setUsers] = useState({users:[],isLoading:true})

    useEffect(() => {

    }, [])

    return(
        <div id='sideBlock' style={{display: props.display, position: 'fixed', right: '10px', top: '50%', color: 'black'}} onClick={()=> {
            if (document.getElementById('sideBlockMainInfo').style.display === 'none'){
                document.getElementById('side-block-button').style.display = 'none';
                document.getElementById('sideBlockMainInfo').style.display = 'block'
            }else {
                document.getElementById('side-block-button').style.display = 'block';
                document.getElementById('sideBlockMainInfo').style.display = 'none'
            }
        }}>
            <div id='side-block-button' style={{/*{height: '50px', width: '50px', backgroundColor: 'black', right: '10px', marginLeft: 'auto'}*/}}>
                <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-arrow-left-square"
                     fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{color: 'rgb(143, 147, 150)'}}>
                    <path fill-rule="evenodd"
                          d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fill-rule="evenodd"
                          d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
            </div>
            <div style={{display: 'none'}} id='sideBlockMainInfo'>
                {props.data.employerName === undefined ? true : <p>Employer: {props.data.employerName}</p>}
                {props.data.name === undefined ? true :<p>Employer: {props.data.surname + " " + props.data.name}</p>}
                    <p>Profession: {props.data.professionName}</p>
                {props.data.salary === undefined ? true : <p>Salary: {props.data.salary}</p>}
                {props.data.experience === undefined ? true : <p>Experience: {props.data.experience} </p>}
                {props.data.experienceYears === undefined ? true : <p>Experience: {props.data.experienceYears} </p>}
            </div>
        </div>
    )

}