import RollList from "./rollList";

class RollListResult {

    rollList : RollList[];
    error?: boolean;
    message: string;
    errors?: {
        error: string,
        field: string
    } [] | null;
    constructor (
        message: string,
        rollList : RollList[],

    ) {
        this.message = message,
        this.rollList = rollList;
    }
}
export default RollListResult;