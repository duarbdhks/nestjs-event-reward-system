import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getServiceUrl(service: string): string {
    const url = this.configService.get<string>(`services.${service}.url`);
    if (!url) {
      throw new HttpException(`Service ${service} not found`, HttpStatus.BAD_GATEWAY);
    }
    return url;
  }

  async forwardRequest(service: string, method: string, path: string, body?: any, headers?: any) {
    try {
      const url = this.getServiceUrl(service);
      const response = await firstValueFrom(
        this.httpService.request({
          method,
          url: `${url}${path}`,
          data: { ...body },
          headers: { ...headers, 'Content-Type': 'application/json' },
        }),
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
