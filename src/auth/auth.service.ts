import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./entities/user.entity";
import { Repository } from "typeorm";
import { handleCustomError } from "src/functions/error";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtPayload } from "./interfaces/jwt-payload";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly authRepository: Repository<Usuario>,
    private readonly jwtService: JwtService
  ) {}

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async create(createUserDto: CreateUserDto): Promise<Usuario> {
    try {
      const user = this.authRepository.create({ ...createUserDto });
      await this.authRepository.save(user);
      return user;
    } catch (error) {
      console.error(error);
      throw handleCustomError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {

    try {
      const { correo, password} = loginUserDto;

  
        const user = await this.authRepository.findOne({
          where: { correo },
          select: {
            username: true,
            uid: true,
            rol: true,
            nombre: true,
            estado: true,
          },
        });

        if (!user) {
          throw new BadRequestException({
            message:
              "Necesitas permisos del administrador del aplicativo para ingresar aquí",
          });
        }

        if (!user.estado) {
          throw new BadRequestException({
            message: "Usuario desactivado, comunicate con el administrador",
          });
        }

        return {
          token: this.getJwtToken({ uid: user.uid }),
          user: {
            id: user.uid,
            username: user.username,
            nombre: user.nombre,
            rol: user.rol,
          },
        };
      

    } catch (error) {
      console.error(error);
      throw new BadRequestException("Error en el servicio, revisa los logs");
    }
  }

  async checkAuthStatus(user: Usuario) {
    const { uid } = user;
    const token = this.getJwtToken({ uid });
    return {
      ok: true,
      uid,
      token,
      user,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
