export const fetchRegister = async (formValues) => {
    const register =await fetch('http://localhost:3030/register', {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {'Content-Type': 'application/json'},

    })

    return await register.json();
}

export const fetchLogin = async (loginValues) => {
    const login = await fetch('http://localhost:3030/login', {
        method: 'POST',
        body: JSON.stringify(loginValues),
        headers: {'Content-Type': 'application/json'},
    })

    return await login.json();
}

export const fetchProfile = async () => {
    const profileResponse = await fetch("http://localhost:3030/show/me", {
        method: 'GET',
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        },
    });

    return await profileResponse.json();
}

export const fetchEditProfile = async (updateProfileValues) => {
    const editProfile = await fetch("http://localhost:3030/edit/me", {
        method: 'PUT',
        body: JSON.stringify(updateProfileValues),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        },
    })

    return await editProfile.json();
}

export const createNewGroup = async (groupValues) => {
    const newGroup = await fetch('http://localhost:3030/groups', {
        method: 'POST',
        body: JSON.stringify(groupValues),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        },

    })

    return await newGroup.json();
}

export const fetchGroups = async () => {
    const groups = await fetch("http://localhost:3030/user-groups", {
        method: 'GET',
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    })

    return await groups.json();
}

export const fetchEditGroup = async (updateGroupValues) => {
    const groupId = updateGroupValues.groupId;

    const editGroup = await fetch(`http://localhost:3030/group/${groupId}`, {
        method: 'PUT',
        body: JSON.stringify(updateGroupValues),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        },
    })

    return await editGroup.json();
}

export const deleteGroup = async (groupId) => {

    const removeGroup = await fetch(`http://localhost:3030/group/${groupId}`, {
        method: 'DELETE',
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
    })

    return await removeGroup.json();
}

export const createNewPost = async (postValues) => {
    const groupId = postValues.groupId;

    const newPost = await fetch(`http://localhost:3030/groups/${groupId}/posts`, {
        method: 'POST',
        body: JSON.stringify(postValues),
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken"),
            'Content-Type': 'application/json'
        },
    })

    return await newPost.json();
}

export const fetchPosts = async (groupId) => {

    const posts = await fetch(`http://localhost:3030/groups/${groupId}/posts`, {
        method: 'GET',
        headers: {
            authorization: "Bearer " + localStorage.getItem("accessToken")
        },
    })

    return await posts.json();
}