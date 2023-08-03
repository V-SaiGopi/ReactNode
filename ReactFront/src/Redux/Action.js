import axios from "axios"
import { toast } from "react-toastify"
import { ADD_USER, DELETE_USER, FAIL_REQUEST, GET_USER_LIST, GET_USER_OBJ, MAKE_REQUEST, UPDATE_USER } from "./ActionType"

export const makeRequest=()=>{
    return{
        type:MAKE_REQUEST
    }
}
export const failRequest=(err)=>{
    return{
        type:FAIL_REQUEST,
        payload:err
    }
}
export const geUserList=(data)=>{
    return{
        type:GET_USER_LIST,
        payload:data
    }
}
export const deleteUser=()=>{
    return{
        type:DELETE_USER
    }
}
export const addUser=()=>{
    return{
        type:ADD_USER
    }
}
export const updateUser=()=>{
    return{
        type:UPDATE_USER
    }
}
export const getUserObj=(data)=>{
    return{
        type:GET_USER_OBJ,
        payload:data
    }
}



export const FetchUserList=()=>{
    return (dispatch)=>{
      dispatch(makeRequest());
      //setTimeout(() => {
        axios.get('http://localhost:8080/api/employees').then(res=>{
            const userlist=res.data;
            dispatch(geUserList(userlist));
          }).catch(err=>{
            dispatch(failRequest(err.message))
            console.log(err.message)
          })
     // }, 2000);
     
    }
}

export const Removeuser = (code) => {
  return async (dispatch) => {
    dispatch(makeRequest());
    try {
      await axios.delete(`http://localhost:8080/api/employees/${code}`)
      dispatch(deleteUser());
      dispatch(FetchUserList()); // Dispatch the action to fetch the updated user list
    } catch (error) {
      dispatch(failRequest(error.message));
    }
  };
}

export const FunctionAddUser=(data)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
      //setTimeout(() => {
        axios.post('http://localhost:8080/api/employees',data).then(res=>{
            dispatch(addUser());
            toast.success('User Added successfully.')
            dispatch(FetchUserList());
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     // }, 2000);
     
    }
}

export const FunctionUpdateUser=(data,code)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
      //setTimeout(() => {
        axios.put(`http://localhost:8080/api/employees/${code}`,data).then(res=>{
            dispatch(updateUser());
            toast.success('User Updated successfully.')
            dispatch(FetchUserList());
            // toast.success('User Updated successfully.')
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     // }, 2000);
    }
}

export const FetchUserObj=(code)=>{
    return (dispatch)=>{
      dispatch(makeRequest());
      //setTimeout(() => {
        axios.get(`http://localhost:8080/api/employees/${code}`).then(res=>{
            const userlist=res.data;
            dispatch(getUserObj(userlist));
          }).catch(err=>{
            dispatch(failRequest(err.message))
          })
     // }, 2000);
     
    }
}
