
export class InvalidArgumentError extends Error{
    constructor(message:string = "The provided argument is not allowed for the action."){
        super(message)
        name = "InvalidArgumentError"
    }
}

export class ArgumentMissingError extends Error{
    constructor(message:string = "Has no argument provide."){
        super(message)
        name = "ArgumentMissingError"
    }
}