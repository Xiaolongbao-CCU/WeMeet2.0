const initialVoteDetail = {
    isVotingStart: false,
    isVotingFinish: false,
    isSelfSubmit:false,
    voting: {
        creator: "",
        secretOrNot: false,
        multiOrNot: [0],
        question: "",
        option: {
            option1: ""
        }
    },
    result: {}
};

export default function vote(state = initialVoteDetail, action) {
    switch (action.type) {
        case "setVotingDetail":
            if(action.data.restart){
                return Object.assign({}, { 
                    isSelfSubmit:false,
                    isVotingFinish: false,
                    voting: action.data 
                });
            } else {
                return Object.assign({}, state, { voting: action.data });
            }
        case "setVotingStart":
            return Object.assign({}, state, { isVotingStart: true });

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
        case "setVotingFinish":
            return Object.assign({}, state, { isVotingFinish: true });

        case "selfSubmitVote":
            return Object.assign({}, state, { isSelfSubmit: true });

        default:
            return state;
    }
}
