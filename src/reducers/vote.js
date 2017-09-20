const initialVoteDetail = {
    isVotingStart: false,
    voting: {
        secretOrNot: false,
        multiOrNot: [0],
        question: "",
        option: {
            "option1": ""
        }
    }
};

export default function vote(state = initialVoteDetail, action) {
    switch (action.type) {
        case "setVotingDetail":
            return Object.assign({}, state, { voting: action.data });

        case "setVotingStart":
            return Object.assign({}, state, { isVotingStart: true });

        default:
            return state;
    }
}
