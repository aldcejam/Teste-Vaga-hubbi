import { IsNotEmpty } from "class-validator";

class CreateRatailerDTO {
    @IsNotEmpty({
        message: 'Name is required'
    })
    name: string;
}

export { CreateRatailerDTO };