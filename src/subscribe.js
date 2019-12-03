let subscribers = {};

const subscribe = (evt,func)=>{
    if(!subscribers[evt]){
        subscribers[evt] = [];
    }
    subscribers[evt].push(func);
}
const publish = (evt,data)=>{
    if(!subscribers[evt]){
        return;
    }
    if(subscribers[evt].length < 1){
        return;
    }
    subscribers[evt].forEach(e=>{
        e(data);
    });
}

const isSubPresent = (evt)=>{
    if(subscribers[evt] && subscribers[evt].length > 0){
        return true;
    }
    return false;
}

export  {
    subscribe,
    publish,
    isSubPresent
};