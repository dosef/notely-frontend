import * as React from "react";
import { hot } from 'react-hot-loader';
import AddNewInput from "../components/AddNewInput/AddNewInput";
import { ListBlock } from "../components/ListBlock/ListBlock";
import { LoadingSpinner } from "../components/LoadingSpinner/LoadingSpinner";

import "./main.scss";

export const DB_BASE_URL = "http://192.168.1.119:8000";

export interface MainProps {
    pageTitle: string;
}
export interface ListForView {
    title: string;
    id: string;
}
export const Main = (props: MainProps) => {
    const [listsData, setListsData] = React.useState<ListForView[]>();
    const [reload, setReload] = React.useState<boolean>(false);

    React.useEffect(() => {
        const sendRequest = async () => {
            await fetch(`${DB_BASE_URL}/lists`)
                .then(res => {
                    return res.json()
                })
                .then((data) => {
                    setListsData(data.lists)
                });
        }
        sendRequest();
    }, [reload]);

    return (
        <div className="block">
            <div className="content">
                <h1>{props.pageTitle}</h1>
                <AddNewInput onAddList={() => setReload(!reload)}></AddNewInput>
                <LoadingSpinner isLoading={!listsData} />
                <div className="listColumns">
                    {listsData &&
                        listsData
                            //.sort((a, b) => a.createdDate > b.createdDate ? 1 : -1)
                            .map((list, i) => {
                                return <ListBlock onDeleteList={() => setReload(!reload)} list={list} />
                            })
                    }
                </div>
            </div>
        </div >
    );
}

export default hot(module)(Main); 