import React, { Component } from 'react';
import style from './index.module.scss';
import * as actions from '../../actions/adress';
import{connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


class Pristatymas extends Component {
       state={
                errors:'',
                gatve:'',
                namas :'',
                butas:'',
                duru_kodas:'',
                komentaras:'',
                redirect:false,
                

       }
       
        onInputChange=(e)=>{
        
            this.setState({[e.target.name]:e.target.value})
            
        }
        closeError=()=>{
              this.setState({
                errors:!this.state.errors,
              })        
        }
       onFormSubmit =(e)=>{
               e.preventDefault();
               const errors = {};
               if(!this.state.gatve) errors.gatve ='įrašykite gatvės pavadinimą';
               if(!this.state.namas) errors.namas ='namo nr?';
               if(Object.keys(errors).length!==0){
                       return this.setState({errors})
               }
               this.setState({
                       errors:{}, redirect:true
               })
               
       }
     
    render() {        
        if( this.state.redirect) return <Redirect to='/checkOut'/>
        return (
            <div className={style.delivery}>
                <form onSubmit ={this.onFormSubmit} >
                        <div className={style.absolute}>
                        <input type="text"
                                name='gatve'
                                placeholder='Gatvė'
                                onChange={this.onInputChange}
                                value={this.state.gatve}
                                className={style.largeInput}/>
                                {this.state.errors.gatve && <div className={style.error}>{this.state.errors.gatve}  <span onClick={()=>this.closeError()}> x </span></div>}
                                </div>
                                <div className={style.absolute}>
                        <input type="text"
                                value={this.state.namas}
                                onChange={this.onInputChange}
                                name='namas'
                                placeholder='namas'
                                className={style.input}/>
                                {!this.state.errors.gatve && this.state.errors.namas && <div className={style.error}>{this.state.errors.namas} <span onClick={()=>this.closeError()}> x</span></div>}
                                </div>
                                <div className={style.absolute}>
                        <input type="text"
                                onChange={this.onInputChange}
                                name='butas'
                                value={this.state.butas}
                                placeholder='butas'
                                className={style.input}/>
                                
                                {/* {!this.state.errors.gatve && !this.state.errors.namas && this.state.errors.butas && <div className={style.error}>{this.state.errors.butas} <span onClick={()=>this.closeError()}> X</span></div>} */}
                                </div>
                                <div className={style.absolute}>
                        <input type="text"
                                onChange={this.onInputChange}
                                value={this.state.duru_kodas}
                                name='duru_kodas'
                                placeholder='durų kodas'
                                className={style.input}/>
                                
                        {/* {!this.state.errors.gatve && !this.state.errors.namas && !this.state.errors.butas && this.state.errors.duru_kodas && <div className={style.error}>{this.state.errors.duru_kodas} <span onClick={()=>this.closeError()}> X</span></div>} */}
                                </div>
                                <div className={style.absolute}>
                        <input type="text"
                                value={this.state.komentaras}
                                onChange={this.onInputChange}
                                name='komentaras'
                                placeholder='komentaras'
                                className={style.largeInput}/>
                </div> 
                        <button className={style.btn} 
                                onClick={()=>{this.props.showAdress(this.state)}}> Patvirtinti adresą </button>
            </form>
            
            </div>
        );
    }
}
const mapStateToProps = state => {
        return{
            auth:state.auth,
            profile:state.profile,
            checkOut:state.checkOut,
        }
};


export default connect(mapStateToProps, actions) (Pristatymas);