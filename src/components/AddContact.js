import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddContact = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [number,setNumber] = useState('');

    const list = useSelector(state=>state);

    const data = JSON.parse(localStorage.getItem('data'));

    let contacts ;

    if(data){
        contacts = data;
    }
    else{
        contacts = list;
    }

    const dispatch = useDispatch();
    const history = useHistory();

    const isEmailPresent = contacts.find((contact) => contact.email === email && email);
    const isNumberPresent = contacts.find((contact) => contact.number.toString() === number && number );

    const onSubmitHandler = (e)=>{
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
            id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
            name,
            email,
            number,
        }

        // console.log(data);
        dispatch({type: 'ADD_CONTACT',payload:data});
        toast.success('Contact added successfully !');
        history.push('/');

    }


    return (
        <div className="container">
            <div className="row">
                <h1 className="display-3 my-5 text-center">
                    Add Contact
                </h1>
                <div className="col-md-6 shadow mx-auto p-5">
                    <form onSubmit={onSubmitHandler}>
                        <div className="form-group">
                            <input type="text" placeholder="Name" className="form-control"
                            value={name} onChange={e=> setName(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" className="form-control"
                            value={email} onChange={e=> setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="number" placeholder="Phone Number" className="form-control"
                            value={number} onChange={e=> setNumber(e.target.value)} />
                        </div>
                        <div className="form-group d-grid gap-2 my-2">
                            <input type="submit" value="Add Contact"
                            className="btn btn-block btn-dark "/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddContact;