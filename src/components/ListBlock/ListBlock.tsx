import * as React from "react";
import { hot } from 'react-hot-loader';
import { DB_BASE_URL, ListForView } from "../../pages/Main";
import Item from "../Item/Item";
import axios from "axios";

import "./listBlock.scss";
import { mergeClassNames } from "../../helpers";

export interface ListBlockProps {
    list: ListForView;
    onDeleteList: () => void;
}

export interface ListItem {
    uuid: string;
    list_id: string;
    title: string;
}

export const ListBlock = (props: ListBlockProps) => {
    const [listItems, setListItems] = React.useState<ListItem[]>();
    const [isActive, setActive] = React.useState<boolean>(false);
    const [itemName, setItemName] = React.useState<string>("");
    const [reload, setReload] = React.useState<boolean>(false);
    const [showError, setShowError] = React.useState(false);

    React.useEffect(() => {
        if (showError == true) {
            setShowError(false);
        };
    }, [itemName]);

    React.useEffect(() => {
        const sendRequest = async () => {
            await axios
                .get(`${DB_BASE_URL}/list?id=${props.list.id}`)
                .catch(e => {
                    console.log(e);
                })
                .then(async (res) => {
                    console.log(res);
                    //const data = res.data.json();
                    if (res) {
                        setListItems(res.data.items);
                    }
                });
        }
        sendRequest();
    }, [reload]);

    const handleDelete = () => {
        axios
            .post(`${DB_BASE_URL}/delete_list`, `id=${props.list.id}`)
            .catch((e) => {
                return console.log("Error occured when deleting list." + e);
            })
            .then(async (data) => {
                if (data) {
                    props.onDeleteList();
                }
            });
    }
    const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = `list_id=${props.list.id}&name=${itemName}`;
        if (!itemName || itemName == "") {
            return setShowError(true);
        } else {
            axios
                .post(`${DB_BASE_URL}/add_item`, data)
                .catch((e) => {
                    return console.log("Error occured when adding item." + e);
                })
                .then(async (data) => {
                    if (data) {
                        setReload(!reload);
                        setItemName("");
                    };
                });
        }
    }

    const handleSetActiveFalse = () => {
        setTimeout(() => {
            setActive(false);
        }, 200);
    }

    return (
        <div className="list">
            <a onClick={handleDelete} className="close"><span>Delete?</span></a>
            <h3>{props.list.title}</h3>
            <div>
                {listItems &&
                    listItems.map(item => {
                        return <Item item={item}></Item>
                    })
                }
            </div>
            <form onSubmit={handleAddItem}>
                <a onClick={() => setActive(true)} onBlur={handleSetActiveFalse} className={mergeClassNames(["addButton", (isActive ? "active" : "")])}>
                    {isActive && <button type="submit" className="buttonTrigger">Add</button>}
                    <input placeholder={!isActive && "+"} onChange={(e) => setItemName(e.target.value)} value={itemName} type="text" className="addInput" />
                </a>
            </form>
            {showError && (
                <div className="errorMessage">Please enter a valid list name</div>
            )}
        </div >
    );
}

export default hot(module)(ListBlock); 