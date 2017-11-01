const initialVoteDetail = {
    isVotingStart: false,
    isVotingFinish: false,
    isVotingDetailOpen: false,
    isSelfSubmit: false,
    waitingForAnimate: false,
    isAnimateOpen: false,
    voting: {
        creator: "",
        secretOrNot: false,
        multiOrNot: [0],
        question: "",
        option: {
            option1: ""
        },
        createTime:""
    },
    result: {},
    history: []
};

export default function vote(state = initialVoteDetail, action) {
    switch (action.type) {
        case "setVotingDetail":
            if (action.data.restart) {
                return {
                    ...state,
                    isVotingStart: false,
                    isVotingFinish: false,
                    isSelfSubmit: false,
                    isVotingDetailOpen: true,
                    waitingForAnimate: false,
                    isAnimateOpen: false,
                    voting: action.data,
                    result: {}
                };
            } else {
                return Object.assign({}, state, { voting: action.data });
            }
        case "setVotingStart":
            return { 
                ...state,
                'voting': Object.assign(
                    {},
                    {...state.voting},
                    {'createTime':action.time}
                ),
                isVotingStart: true,
                isVotingDetailOpen: false
            }

        case "gotVoteFromServer":
            let sender = action.data.sender;
            let content = action.data.content;
            let newResult = Object.assign({}, state.result);
            content.map(chosenOption => {
                if (Object.keys(newResult).length > 0) {
                    //如果前面已經有結果了，就拿選票內容 > 一個一個對選項 > 一樣的就在newResult裡面加一項
                    Object.keys(newResult).map(optionKey => {
                        if (chosenOption == optionKey) {
                            //代表這有人投過了，把票數加上去
                            newResult[optionKey].sum += 1;
                            if (sender) {
                                newResult[optionKey].voter.push(sender);
                            }
                        } else {
                            //代表這選項沒人投過，加上去
                            newResult[chosenOption] = {
                                sum: 1,
                                voter: []
                            };
                            if (sender) {
                                newResult[chosenOption].voter.push(sender);
                            }
                        }
                    });
                } else {
                    //如果是第一個人投的
                    newResult[chosenOption] = {
                        sum: 1,
                        voter: []
                    };
                    if (sender) {
                        newResult[chosenOption].voter.push(sender);
                    }
                }
            });
            return Object.assign({}, state, { result: newResult });

        case "setAnimateOpen":
            return Object.assign({}, state, { isAnimateOpen: true });

        case "setAnimateClose":
            return Object.assign({}, state, { isAnimateOpen: false });

        case "setVotingFinish":
            return Object.assign({}, state, { isVotingFinish: true });

        case "waitingForAnimate":
            return {
                ...state,
                waitingForAnimate: true,
                history: [
                    ...state.history,
                    {
                        'vote': state.voting,
                        'result': state.result,
                        'finishTime': action.time
                    }
                ]
            };
        case "selfSubmitVote":
            return Object.assign({}, state, { isSelfSubmit: true });

        case 'setVotingDetailState':
            return Object.assign({}, state, { isVotingDetailOpen: action.data });

        default:
            return state;
    }
}
