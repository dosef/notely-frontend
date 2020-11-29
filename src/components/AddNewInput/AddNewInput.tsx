import * as React from "react";
import { hot } from 'react-hot-loader';
import "./addNewInput.scss";
import axios from "axios";
import { DB_BASE_URL } from "../../pages/Main";

export interface AddNewInputProps {
    onAddList: () => void;
}


export const AddNewInput = (props: AddNewInputProps) => {
    const [state, setState] = React.useState("");
    const [showError, setShowError] = React.useState(false);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => { setState(event.target.value) };

    React.useEffect(() => {
        if (showError == true) {
            setShowError(false);
        };
    }, [state]);

    const addList = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!state || state == "") {
            return setShowError(true);
        } else {
            axios
                .post(`${DB_BASE_URL}/add_list`, `name=${state}`)
                .catch((e) => {
                    return console.log("Error occured. You suck." + e);
                })
                .then(async (data) => {
                    if (data) {
                        props.onAddList();
                        setState("");
                    }
                });
        }

    }

    return (
        <div className="newInputWrapper">
            <form onSubmit={addList}>
                {/* <label htmlFor="addItemInput">Enter list name</label> */}
                <input className="input" placeholder={"Describe your list e.g. Climbing gear"} onChange={onChange} type="text" id="addItemInput" name="addItemInput" value={state}></input>
                <button className="submitButton" type="submit">+ Add new list</button>
            </form>
            {showError && (
                <div className="errorMessage">Please enter a valid list name</div>
            )}
        </div>
    );
}

export default hot(module)(AddNewInput); 
