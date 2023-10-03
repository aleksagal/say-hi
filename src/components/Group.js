import React from "react";
import '../App.css';
import useApp from "../api/AppContext";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EditGroup from "./EditGroup";
import DeleteGroup from "./DeleteGroup";
import GroupMembers from "./GroupMembers";

const iconMapping = {
    EscalatorWarningIcon: <EscalatorWarningIcon/>,
    ConnectWithoutContactIcon: <ConnectWithoutContactIcon/>,
    Diversity3Icon: <Diversity3Icon/>,
};

export default function Group() {
    const {group} = useApp();

    return (
        <div className="group">
            <div className={'title'}>
                <p style={{color: '#7E6F88', margin: '0'}}>
                    {group ? iconMapping[group.icon] : <EscalatorWarningIcon/>}
                </p>
                <h3 className={'main-color font'} style={{margin: '0.3rem', color: '#7E6F88'}}>
                    {group ? group.groupName : 'Group Name'}
                </h3>
                <h5 className={'main-color font-light'} style={{margin: '0'}}>
                    {group ? group.description : 'Description'}
                </h5>
            </div>
            <div className={'option'}>
                <EditGroup/>
                <DeleteGroup/>
                <GroupMembers/>
            </div>
        </div>
    );
}