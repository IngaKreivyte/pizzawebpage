import * as types from '../actions/types';


const initialState= {
    name:'',
    phone:'',
    email:'',
    password:'',
    password2:'',
    LoginErrors:{},
    errors:{},
};


export default (state=initialState, action)=>{
    switch(action.type){
        case types.SIGN_UP_ERROR:
            return{...state, LoginErrors:{}, errors:action.errors};
            case types.LOG_IN_ERROR:
            return{...state, errors:{}, LoginErrors:action.LoginErrors};
        case types.SIGN_INPUT_CHANGE :
            return {...state, [action.name]:action.value};
            case types.LOG_OUT : 
            return initialState;
        default:
            return state
    }
}