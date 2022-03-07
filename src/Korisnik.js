import React,{Component} from 'react';
import {variables} from './Variables.js';
export class Korisnik extends Component{
    constructor(props){
        super(props);

        this.state={
            korisnici:[],
            zivotinje:[],
            modalTitle:"",
            Korisnik_id:0,
            Korisnik_ime:"",
            Korisnik_prezime:"",
            Korisnik_email:"",
            Korisnik_zivotinja:"",
            Korisnik_br_tel:""
        }
    }
    refreshList(){
        fetch(variables.API_URL+'korisnik')
        .then(response=>response.json())
        .then(data=>{
            this.setState({korisnici:data});
        });

        fetch(variables.API_URL+'zivotinja')
        .then(response=>response.json())
        .then(data=>{
            this.setState({zivotinje:data});
        });

        
    }
    componentDidMount(){
        this.refreshList();
    }
    
    changeKorisnik_ime =(e)=>{
        this.setState({Korisnik_ime:e.target.value});
    }
    changeKorisnik_prezime =(e)=>{
        this.setState({Korisnik_prezime:e.target.value});
    }
    changeKorisnik_email =(e)=>{
        this.setState({Korisnik_email:e.target.value});
    }
    changeKorisnik_zivotinja =(e)=>{
        this.setState({Korisnik_zivotinja:e.target.value});
    }
    changeKorisnik_br_tel =(e)=>{
        this.setState({Korisnik_br_tel:e.target.value});
    }
    
    editClick(kor){
        this.setState({
            modalTitle:"Uredi detalje",
            Korisnik_id:kor.Korisnik_id,
            Korisnik_ime:kor.Korisnik_ime,
            Korisnik_prezime:kor.Korisnik_prezime,
            Korisnik_email:kor.Korisnik_email,
            Korisnik_zivotinja:kor.Korisnik_zivotinja,
            Korisnik_br_tel:kor.Korisnik_br_tel,
        });
    }
    updateClick(){
        fetch(variables.API_URL+'korisnik',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Korisnik_id:this.state.Korisnik_id,
                Korisnik_ime:this.state.Korisnik_ime,
                Korisnik_prezime:this.state.Korisnik_prezime,
                Korisnik_email:this.state.Korisnik_email,
                Korisnik_zivotinja:this.state.Korisnik_zivotinja,
                Korisnik_br_tel:this.state.Korisnik_br_tel,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'korisnik/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
   

    render(){
        const {
            korisnici,
            modalTitle,
            Korisnik_id,
            Korisnik_ime,
            Korisnik_prezime,
            Korisnik_email,
            Korisnik_zivotinja,
            Korisnik_br_tel,
        }=this.state;

        return(
            <div> <br></br>
    <table style={{marginTop:'100px'}}className="table table-striped">
    <thead>
    <tr>
        <th>
            Korisnik ID
        </th>
        <th>
            Ime korisnika
        </th>
        <th>
            Prezime korisnika
        </th>
        <th>
            Email
        </th>
        <th>
            Životinja za udomljavanje
        </th>
        <th>
            Broj telefona
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {korisnici.map(kor=>
            <tr key={kor.Korisnik_id}>
                <td>{kor.Korisnik_id}</td>
                <td>{kor.Korisnik_ime}</td>
                <td>{kor.Korisnik_prezime}</td>
                <td>{kor.Korisnik_email}</td>
                <td>{kor.Korisnik_zivotinja}</td>
                <td>{kor.Korisnik_br_tel}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(kor)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(kor.Korisnik_id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>
   <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">
    <div className="p-2 w-50 bd-highlight">
    
    
        <div className="input-group mb-3">
            <span className="input-group-text">Ime korisnika</span>
            <input type="text" className="form-control"
            value={Korisnik_ime}
            onChange={this.changeKorisnik_ime}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Prezime</span>
            <input type="text" className="form-control"
            value={Korisnik_prezime}
            onChange={this.changeKorisnik_prezime}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Email</span>
            <input type="text" className="form-control"
            value={Korisnik_email}
            onChange={this.changeKorisnik_email}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Zivotinja za udomljavanje</span>
            <input type="text" className="form-control"
            value={Korisnik_zivotinja}
            onChange={this.changeKorisnik_zivotinja}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Broj telefona</span>
            <input type="text" className="form-control"
            value={Korisnik_br_tel}
            onChange={this.changeKorisnik_br_tel}/>
        </div>
        

    </div>
     
    </div>

        {Korisnik_id!==0?
        <button type="button"
        className="btn btn-dark float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

</div>
</div> 
</div>
            </div>
        )
    }
}