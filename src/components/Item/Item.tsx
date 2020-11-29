import * as React from "react";
import { hot } from 'react-hot-loader';
import { mergeClassNames } from "../../helpers";
import { ListItem } from '../ListBlock/ListBlock'

import "./item.scss";

export interface ItemProps {
    item: ListItem;
}


export const Item = (props: ItemProps) => {
    const [isChecked, setIsChecked] = React.useState<boolean>(false); // item.done: When we have a DB value then we can set it on render
    return (
        <div>
            <label className={mergeClassNames(["container", isChecked ? "checkedItem" : ""])} htmlFor={props.item.uuid}>
                {props.item.title}
                <input checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" id={props.item.uuid} name={props.item.uuid} value={props.item.uuid} />
                <span className="checkBox"></span>
            </label>
        </div>
    );
}

export default hot(module)(Item); 