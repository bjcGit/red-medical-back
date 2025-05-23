import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Usuario } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Usuario)
        private readonly userRepository: Repository<Usuario>,
        configService: ConfigService,
    ) {
        super({
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }
    async validate(payload: JwtPayload): Promise<Usuario> {

        const { uid } = payload;
        
        const user = await this.userRepository.findOneBy({ uid });

        if (!user)
            throw new UnauthorizedException('Token no válido');
        if (!user.estado)
            throw new UnauthorizedException('Usuario inactivo');

      
        return user;
    }

}