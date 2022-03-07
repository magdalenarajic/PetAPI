import React,{Component} from 'react';
import {variables} from './Variables.js';
export class Zivotinja extends Component{
    constructor(props){
        super(props);

        this.state={
            zivotinje:[],
            modalTitle:"",
            Zivotinja_id:0,
            Zivotinja_ime:"",
            Zivotinja_pasmina:"",
            Zivotinja_dob:"",
            Zivotinja_spol:"",
            Zivotinja_lokacija:"",
            Zivotinja_cjepivo:"",
            Slika:"anonymous.png",
            PhotoPath:variables.PHOTO_URL
        }
    }
    refreshList(){

        fetch(variables.API_URL+'zivotinja')
        .then(response=>response.json())
        .then(data=>{
            this.setState({zivotinje:data});
        });

        fetch(variables.API_URL+'korisnik')
        .then(response=>response.json())
        .then(data=>{
            this.setState({korisnici:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }
    
    changeZivotinja_ime =(e)=>{
        this.setState({Zivotinja_ime:e.target.value});
    }
    changeZivotinja_pasmina =(e)=>{
        this.setState({Zivotinja_pasmina:e.target.value});
    }
    changeZivotinja_dob =(e)=>{
        this.setState({Zivotinja_dob:e.target.value});
    }
    changeZivotinja_spol =(e)=>{
        this.setState({Zivotinja_spol:e.target.value});
    }
    changeZivotinja_lokacija =(e)=>{
        this.setState({Zivotinja_lokacija:e.target.value});
    }
    changeZivotinja_cjepivo =(e)=>{
        this.setState({Zivotinja_cjepivo:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"DODAJ ZIVOTINJU",
            Zivotinja_id:0,
            Zivotinja_ime:"",
            Zivotinja_pasmina:"",
            Zivotinja_dob:"",
            Zivotinja_spol:"",
            Zivotinja_lokacija:"",
            Zivotinja_cjepivo:"",
            Slika:"anonymous.png"
        });
    }
    editClick(ziv){
        this.setState({
            modalTitle:"Uredi detalje",
            Zivotinja_id:ziv.Zivotinja_id,
            Zivotinja_ime:ziv.Zivotinja_ime,
            Zivotinja_pasmina:ziv.Zivotinja_pasmina,
            Zivotinja_dob:ziv.Zivotinja_dob,
            Zivotinja_spol:ziv.Zivotinja_spol,
            Zivotinja_lokacija:ziv.Zivotinja_lokacija,
            Zivotinja_cjepivo:ziv.Zivotinja_cjepivo,
            Slika:ziv.Slika,
        });
    }
    createClick(){
        fetch(variables.API_URL+'zivotinja',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Zivotinja_ime:this.state.Zivotinja_ime,
                Zivotinja_pasmina:this.state.Zivotinja_pasmina,
                Zivotinja_dob:this.state.Zivotinja_dob,
                Zivotinja_spol:this.state.Zivotinja_spol,
                Zivotinja_lokacija:this.state.Zivotinja_lokacija,
                Zivotinja_cjepivo:this.state.Zivotinja_cjepivo,
                Slika:this.state.Slika
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
    updateClick(){
        fetch(variables.API_URL+'zivotinja',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Zivotinja_id:this.state.Zivotinja_id,
                Zivotinja_ime:this.state.Zivotinja_ime,
                Zivotinja_pasmina:this.state.Zivotinja_pasmina,
                Zivotinja_dob:this.state.Zivotinja_dob,
                Zivotinja_spol:this.state.Zivotinja_spol,
                Zivotinja_lokacija:this.state.Zivotinja_lokacija,
                Zivotinja_cjepivo:this.state.Zivotinja_cjepivo,
                Slika:this.state.Slika
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
        fetch(variables.API_URL+'zivotinja/'+id,{
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
    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'zivotinja/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({Slika:data});
        })
    }

    render(){
        const {
            zivotinje,
            modalTitle,
            Zivotinja_id,
            Zivotinja_ime,
            Zivotinja_pasmina,
            Zivotinja_dob,
            Zivotinja_spol,
            Zivotinja_lokacija,
            Zivotinja_cjepivo,
            PhotoPath,
            Slika,
        }=this.state;

        return(
            <div>
                <br></br>
    <table style={{marginTop:'100px'}}className="table table-striped">
    
    <thead>
    <tr>
        <th>
            Zivotinja ID
        </th>
        <th>
            Ime zivotinje
        </th>
        <th>
            Vrsta
        </th>
        <th>
            Dob
        </th>
        <th>
            Spol
        </th>
        <th>
            Lokacija
        </th>
        <th>
            Cjepivo
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {zivotinje.map(ziv=>
            <tr key={ziv.Zivotinja_id}>
                <td>{ziv.Zivotinja_id}</td>
                <td>{ziv.Zivotinja_ime}</td>
                <td>{ziv.Zivotinja_pasmina}</td>
                <td>{ziv.Zivotinja_dob}</td>
                <td>{ziv.Zivotinja_spol}</td>
                <td>{ziv.Zivotinja_lokacija}</td>
                <td>{ziv.Zivotinja_cjepivo}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(ziv)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(ziv.Zivotinja_id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>
    <button type="button"
    className="btn btn-dark m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Dodaj zivotinju
    </button>
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
            <span className="input-group-text">Ime zivotinje</span>
            <input type="text" className="form-control"
            value={Zivotinja_ime}
            onChange={this.changeZivotinja_ime}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Vrsta</span>
            <input type="text" className="form-control"
            value={Zivotinja_pasmina}
            onChange={this.changeZivotinja_pasmina}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Dob</span>
            <input type="text" className="form-control"
            value={Zivotinja_dob}
            onChange={this.changeZivotinja_dob}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Spol</span>
            <input type="text" className="form-control"
            value={Zivotinja_spol}
            onChange={this.changeZivotinja_spol}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Lokacija</span>
            <input type="text" className="form-control"
            value={Zivotinja_lokacija}
            onChange={this.changeZivotinja_lokacija}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">CJEPIVO</span>
            <input type="text" className="form-control"
            value={Zivotinja_cjepivo}
            onChange={this.changeZivotinja_cjepivo}/>
        </div>

     </div>
     <div className="p-2 w-50 bd-highlight">
         <img width="250px" height="250px"
         src={PhotoPath+Slika}  alt="My Awesome"/>
         <input className="m-2" type="file" onChange={this.imageUpload}/>
     </div>
    </div>

    {Zivotinja_id===0?
        <button type="button"
        className="btn btn-dark float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {Zivotinja_id!==0?
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