import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link,useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

const EditContact = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [number,setNumber] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    
    const {id} = useParams();
    
    const contacts = useSelector(state=>state);
    const currentContact= contacts.find(contact=> contact.id === parseInt(id));

    useEffect(()=>{
        if(currentContact){
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
    },[currentContact])

    const isEmailPresent = contacts.find((contact) =>contact.id !== parseInt(id) && contact.email === email && email);
    const isNumberPresent = contacts.find((contact) =>contact.id !== parseInt(id) &&  contact.number.toString() === number && number );

    const editHandler = (e)=>{
        e.preventDefault();

        if(!email || !number || !name){
            return toast.warning('Please fill in all fields !');
        }

        if(isEmailPresent){
            return toast.warning('The email is already registered !');
        }

        if(isNumberPresent){
            return toast.warning('The number is already registered!');
        }
        const data = {
            id: parseInt(id),
            name,
            email,
            number,
        }
    
        // console.log(data);
        dispatch({type: 'UPDATE_CONTACT',payload:data});
        toast.success('Contact updated successfully !');
        history.push('/');
    }


    return (
        <div className="container">
            {currentContact? (

            <>
                <div className="row">
                    <h1 className="display-3 my-5 text-center">
                        Edit Contact {id}
                    </h1>
                    <div className="col-md-6 shadow mx-auto p-5">
                        <form onSubmit={editHandler}>
                            <div className="form-group">
                                <input type="text" placeholder="Name" className="form-control"
                                value={name} onChange={e=> setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Email" className="form-control"
                                value={email} onChange={e=> setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="number" placeholder="Phone Number" className="form-control"
                                value={number} onChange={e=> setNumber(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Update"
                                className="btn btn-success "/>
                                <Link to="/" 
                                className="btn btn-danger ml-5 ">
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </>
            ):(
                <h1 className="display-3 my-5 text-center">
                        Contact with id: {id} does not exist.
                    </h1>
            )}
        </div>
    )
}

export default EditContact;