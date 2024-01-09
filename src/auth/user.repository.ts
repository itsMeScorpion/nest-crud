import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/signup.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
