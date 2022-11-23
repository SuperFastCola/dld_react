class KeyGenerator {

    public createItemKey(){
        return Math.ceil((Math.random() * 100) * 1000);
    }
}

export {KeyGenerator};