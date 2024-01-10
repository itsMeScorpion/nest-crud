import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entity/signup.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {}
