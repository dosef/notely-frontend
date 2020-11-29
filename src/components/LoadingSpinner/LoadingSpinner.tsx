import * as React from "react";
import { hot } from 'react-hot-loader';

import "./loadingSpinner.scss";

export interface LoadingSpinnerProps {
    isLoading: boolean;
}

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
    if (props.isLoading) {
        return (<div className="spinner"></div>);
    } else {
        return null;
    }
}

export default hot(module)(LoadingSpinner); 