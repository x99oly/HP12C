
export default class InvalidArgumentError extends Error{
    constructor(message:string = "The provided argument is not allowed for the action."){
        super(message)
        name = "InvalidArgumentError"
    }
}