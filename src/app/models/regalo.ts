import { Amigo } from "./amigo";

export class Regalo{
    public amigo1: Amigo;
    public amigo2: Amigo;

    constructor(amigo1: Amigo, amigo2: Amigo){
        this.amigo1 = amigo1;
        this.amigo2 = amigo2;
    }
}