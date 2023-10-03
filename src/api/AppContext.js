import {createContext, useReducer, useContext} from "react"
import AppReducer, {initialState} from './AppReducer';

const AppContext = createContext(initialState);

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const setUser = (user) => {
        dispatch({
            type: "SET_USER",
            payload: {
                user: user
            }
        });
    };

    const setGroup = (group) => {
        dispatch({
            type: "SET_GROUP",
            payload: {
                group: group
            }
        });
    }

    const setRefreshGroups = (refreshGroups) => {
        dispatch({
            type: "SET_REFRESH_GROUPS",
            payload: {
                refreshGroups : refreshGroups
            }
        });
    }

    const setPost = (post) => {
        dispatch({
            type: "SET_POST",
            payload: {
                post: post
            }
        });
    }

    const value = {
        user: state.user,
        setUser,
        group: state.group,
        setGroup,
        refreshGroups: state.refreshGroups,
        setRefreshGroups,
        post: state.post,
        setPost,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};


const useApp = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error("useApp must be used within AppContext")
    }

    return context
}

export default useApp;
