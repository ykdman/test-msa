import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async findOneByEmail(email: string) {
    const pattern = { cmd: 'findOneByEmail' };
    const payload = email;
    const { id: userId } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return userId;
  }

  async create(email: string, password: string) {
    const pattern = { cmd: 'create' };
    const payload = { email, password };
    const userInfo = await this.client.send(pattern, payload);
    // const { id: userId } = await firstValueFrom<{ id: string }>(
    //   this.client.send(pattern, payload),
    // );
    return userInfo;
  }

  // TODO
  async validateUser(email: string, password) {
    return '';
  }

  // TODO
  async checkUserIsAdmin(id: string) {
    return true;
  }
}
