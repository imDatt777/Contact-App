const initialState = [
    {
        id:0,
        name: 'Vijay Singh',
        number: 9856243710,
        email: 'vs@gmail.com',
    },
    {
        id:1,
        name: 'Rahul Kumar',
        number: 9854327196,
        email: 'rk@gmail.com',
    }
];


const contactReducer = (state= initialState,action)=>{
    switch(action.type){
        case 'ADD_CONTACT':
            state = [...state,action.payload];
            localStorage.setItem('data',JSON.stringify(state));
            return state;

        case 'UPDATE_CONTACT':
            const updateState = state.map((contact)=> contact.id === action.payload.id ? action.payload : contact);
            state = updateState;
            localStorage.setItem('data',JSON.stringify(state));
            return state;

        case 'DELETE_CONTACT':
            const filteredContacts = state.filter(contact => contact.id!== action.payload && contact);
            state = filteredContacts;
            localStorage.setItem('data',JSON.stringify(state));
            return state;    
        default:
            return state;
    }
};
export default contactReducer;