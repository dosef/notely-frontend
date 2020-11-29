import React from "react";
import ReactDOM from "react-dom";

// import MyImage from './assets/dog.jpg';
import './index.scss';
import Main from "./pages/Main";

const App = () => {
    return (
        <div>
            <Main pageTitle={"Lists"}></Main>
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));