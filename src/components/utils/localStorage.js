export const loadState = ()=>{
    try{
        const seraializedState = localStorage.getItem("cart")
        return seraializedState ? JSON.parse(seraializedState) : undefined
    }catch(err){
        console.error("Could not load state from localStorage", err);
        return undefined;
    }
}

export const saveState = (state)=>{
try{
    const seraializedState = JSON.stringify(state);
localStorage.setItem("cart" , seraializedState)
}catch(err){
    console.error("Could not save state to localStorage", err);

}
}