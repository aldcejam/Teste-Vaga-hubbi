import { IsNotEmpty } from "class-validator";

abstract class CreateRatailerDTO {
    @IsNotEmpty({
        message: 'name, nome é obrigatório'
    })
    name: string;
}

export { CreateRatailerDTO };