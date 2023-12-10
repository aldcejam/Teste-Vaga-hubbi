import { IsNotEmpty } from "class-validator";

abstract class CreateRatailerDTO {
    @IsNotEmpty({
        message: 'Name is required'
    })
    name: string;
}

export { CreateRatailerDTO };