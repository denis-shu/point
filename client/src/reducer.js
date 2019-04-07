export default function reducer(state, {type, payload}) {
    switch (type) {
        case "LOGIN":
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state;
    }
}