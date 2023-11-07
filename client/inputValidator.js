export default class inputValidator{
    constructor(responseCode, message) {
        this.responseCode = responseCode;
        this.message = message;
    }
    validate(xVal, yVal, rVal){
        if (![-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2].includes(xVal)) {
            this.message = "The X value should be something from this array: [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2]";            
            this.responseCode = 0;
        } else if (!(-5 < yVal && yVal < 3)){
            this.message = "The Y value should be in (-5, 3) interval";
            this.responseCode = 0;
        } else if (![1, 2, 3, 4, 5].includes(rVal)){
            this.message = "The R value should be something from this array: [1, 2, 3, 4, 5]";
            this.responseCode = 0;
        } else {
           this.responseCode = 1;
        }
    }

    getResponseCode(){
        return this.responseCode;
    }
    getMessage(){
        return this.message;
    }
}