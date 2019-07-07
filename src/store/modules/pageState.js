export default {
    namespaced: true,
    state: {
        id : "",
        isSignin : "",
        key:"",
        peopleNuState:true,
        peopleNumber:""
    },
    mutations: {
        setId(state ,id){
            state.id = id
            console.log("------------ukey------设置成功：" + id)
        },
        setIsSignin(state ,isSignin){
            state.isSignin = isSignin
            console.log("------------scene------设置成功：" + isSignin);
        },
        setKey(state,key){
            state.key =key
            console.log("------------scene------设置成功：" + key);
        },
        setPeopleNuState(state,peopleNuState){
            state.peopleNuState = peopleNuState
            console.log("------------scene------设置成功：" + peopleNuState);
        },
        setPeopleNumber(state,peopleNumber){
            state.peopleNumber = peopleNumber
        }

    },
    actions: {},
    getters: {}
};
