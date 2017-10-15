const initialVoteDetail = {
    isVotingStart: false,
    isVotingFinish: false,
    voting: {
        creator:"",
        secretOrNot: false,
        multiOrNot: [0],
        question: "",
        option: {
            "option1": ""
        }
    },
    result:{}
};

export default function vote(state = initialVoteDetail, action) {
    switch (action.type) {
        case "setVotingDetail":
            return Object.assign({}, state, { voting: action.data });

        case "setVotingStart":
            return Object.assign({}, state, { isVotingStart: true });

        case "gotVoteFromServer":
            let sender = action.data.sender;
            let content = action.data.content;
            let result = {}
            Object.keys(state.voting.option).map((key)=>{
                result[key] = {
                    "sum":0,
                    voter:[]
                }
            })

            content.map((chosenOption)=>{
                //拿選票內容 > 一個一個對選項 > 一樣的就在result裡面加一項
                Object.keys(result).map((key)=>{
                    if(key == chosenOption){
                        result[key].sum += 1
                        if(sender){
                            result[key].voter.push(sender)
                        }
                    }
                })
            })

            return Object.assign({},state,{result:result})
        case "setVotingFinish":
            return Object.assign({}, state, { isVotingFinish: true });
        default:
            return state;
    }
}
