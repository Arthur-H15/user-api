import { Transform } from "class-transformer";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class UserDtoValidacao {
    @IsString({
        message: 'Verifique o campo Nome',
    })
    @Matches(/^[^0-9]*$/, {
        message: 'Verifique o campo Nome',
    })
    nome: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: 'A senha deve ter pelo menos 8 caracteres, uma letra e um caractere especial',
    })
    senha: string;
    @IsString()
    @Matches(/^\d{11}$/, {
    message: 'O número de telefone deve ter exatamente 11 dígitos e não deve conter letras',
  })
    numero: string;

}