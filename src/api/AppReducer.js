export const initialState = {
    user: {},
    group: {},
    post: {},
    refreshGroups: 0,
};

const AppReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "SET_USER":
            return {
                ...state,
                user: payload.user
            };

        case "SET_GROUP":
            return {
                ...state,
                group: payload.group
            };

        case "SET_REFRESH_GROUPS":
            return {
                ...state,
                refreshGroups: payload.refreshGroups
            };

        case "SET_POST":
            return {
                ...state,
                post: payload.post
            };

        default:
            throw new Error(`No case for type ${type} found in AppReducer.`);
    }
};

export default AppReducer

