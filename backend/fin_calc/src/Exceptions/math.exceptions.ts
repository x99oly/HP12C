
export default class DivideByZeroError extends Error{
    constructor(mesage:string = "Divide by 0 is not allowed") {
        super(mesage)
        this.name = "DivideByZeroError"
    }
}
