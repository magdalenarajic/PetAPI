import React, {Component} from 'react';
import './Home.css';
import background from "./assets/images/bg1.jpg";
import {variables} from './Variables.js';

export class Home extends Component{
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
        PhotoPath:"http://localhost:36237/Photos/",
        korisnici:[],
        Korisnik_id:0,
        Korisnik_ime:"",
        Korisnik_prezime:"",
        Korisnik_email:"",
        Korisnik_zivotinja:"",
        Korisnik_br_tel:""
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
  addClick(ziv){
    this.setState({
        modalTitle:"Popuni formu kako bi udomio životinju!",
        Korisnik_id:0,
        Korisnik_ime:"",
        Korisnik_prezime:"",
        Korisnik_email:"",
        Korisnik_zivotinja:ziv.Zivotinja_ime,
        ID_zivotinje: ziv.Zivotinja_id,
        Korisnik_br_tel:"",
        Slika1: ziv.Slika,
        PhotoPath:"http://localhost:36237/Photos/"
    });
}
createClick(){
  fetch(variables.API_URL+'korisnik',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
          Korisnik_ime:this.state.Korisnik_ime,
          Korisnik_prezime:this.state.Korisnik_prezime,
          Korisnik_email:this.state.Korisnik_email,
          Korisnik_zivotinja:this.state.Korisnik_zivotinja + this.state.ID_zivotinje,
          Korisnik_br_tel:this.state.Korisnik_br_tel
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
    render(){  
      const {
        zivotinje,
        PhotoPath,
        modalTitle,
        Korisnik_id,
        Korisnik_ime,
        Korisnik_prezime,
        Korisnik_email,
        Korisnik_zivotinja,
        Korisnik_br_tel,
        Slika1,
    }=this.state;
    return (
          <><div style={{
        backgroundImage: `url(${background})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
      }}>
        <div className="content-center brand">
          <br /><br /><br /><br /><br /><br /><br /><br /><br />
          <h2 className="h1-seo">
            Da li ste spremni da se zaljubite u ljubimca koji je pametan, naučen na kuću i može ostajati sam, prelijepog ponašanja, dubokih očiju i neodoljivog karaktera?

          </h2>
        </div>
      </div><div> <br></br>
      <h5> VAŽNO: Rasni psi na ovoj prijavi dostupni su samo u slučaju da imamo informaciju o takvim psima koji su dostupni za udomljavanje. Ako želite udomiti zdravog, socijaliziranog mješanca koji odgovara baš vama, pogledajte dostupne pse u našem programu i prijavite se. Prijava se odnosi samo na psa kojeg ste odabrali. Moguće je poslati prijavu za više pasa za koje ste zainteresirani.
        </h5> <br></br>
        <h3>PSI KOJI TRAŽE DOM: </h3> 
        <div class="tbl-header">
      <table className="table table-striped">
    <thead>
    <tr>
      <th>Slika </th>
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
    </tr>
    </thead>
    </table>
    </div>
    <div class="tbl-content">
    <table className="table table-striped">
    <tbody>
        {zivotinje.map(ziv=>
            <tr key={ziv.Zivotinja_id}>
                <td><img width="290px" height="250px"
         src={PhotoPath+ziv.Slika}  alt="ziv.Slika"/>
         <td><button type="button"
    className="btn btn-dark m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick(ziv)}>
        Udomi
    </button>
    </td>
         </td>
                <td>{ziv.Zivotinja_ime}</td>
                <td>{ziv.Zivotinja_pasmina}</td>
                <td>{ziv.Zivotinja_dob}</td>
                <td>{ziv.Zivotinja_spol}</td>
                <td>{ziv.Zivotinja_lokacija}</td>
                <td>{ziv.Zivotinja_cjepivo}</td>

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
    <label for="fname">Životinja za udomljavanje</label>
            <input type="text" id="imezivotinje" value={Korisnik_zivotinja} readOnly />
        </div>
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
            <span className="input-group-text">Broj telefona</span>
            <input type="text" className="form-control"
            value={Korisnik_br_tel}
            onChange={this.changeKorisnik_br_tel}/>
        </div>

    </div>
    <div className="d-flex flex-row-reverse bd-highlight ">
    <div className="input-group ">
    <img width="320px" height="280px"
         src={PhotoPath+Slika1}  alt="My Avesome"/>
         
        </div>
    </div>
    </div>

    {Korisnik_id===0?
        <button type="button"
        className="btn btn-dark float-start"
        onClick={()=>this.createClick(ziv)}
        >Pošalji prijavu</button>
        :null}


   </div>

</div>
</div> 
</div>
    
                </tr>
                
        )}
       
        </tbody>
        
    </table>
   
    </div>
        </div>
        <div class="made-with-love">
  Made 
  <i>♥</i> by Tim 2 - Magdalena Rajić, Ivona Škobić , Helena Zeko , Ivona Lozić
</div></>
    
      
    );
  }
}

