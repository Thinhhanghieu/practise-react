import React, { useReducer } from 'react';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
}

type ActionType =
  | { type: 'SET_FIRST_NAME'; payload: string }
  | { type: 'SET_LAST_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'RESET' };

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: ''
};

const formReducer = (state: FormState, action: ActionType): FormState => {
  switch (action.type) {
    case 'SET_FIRST_NAME':
      return { ...state, firstName: action.payload };
    case 'SET_LAST_NAME':
      return { ...state, lastName: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const Reducer: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(event);
    
    console.log(state);
  };

  return (
    <div>
      <h2>Form Example with useReducer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            value={state.firstName}
            onChange={(e) => dispatch({ type: 'SET_FIRST_NAME', payload: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            value={state.lastName}
            onChange={(e) => dispatch({ type: 'SET_LAST_NAME', payload: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch({ type: 'RESET' })}>
          Reset
        </button>
      </form>

      <div>
        <h3>Form State</h3>
        <p>First Name: {state.firstName}</p>
        <p>Last Name: {state.lastName}</p>
        <p>Email: {state.email}</p>
      </div>
    </div>
  );
};

export default Reducer;
