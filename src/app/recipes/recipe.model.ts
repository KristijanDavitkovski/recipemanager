import { Ingiridient } from "../shared/ingridient.model";

export class Recipe {
    public name: string;
    public description: string;
    public imgPath: string;
    public ingridients: Ingiridient[];
    
    constructor(name: string, desc:string,imgpath:string,ingridients:Ingiridient[]){
        this.name=name;
        this.description=desc;
        this.imgPath=imgpath;
        this.ingridients=ingridients;

    }
}