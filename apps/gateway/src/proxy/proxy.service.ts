import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Method } from 'axios';
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

  async forwardRequest(service: string, method: Method, path: string, body?: any, headers?: any) {
    try {
      const url = this.getServiceUrl(service);
      const { authorization } = headers ?? {};
      const safeHeaders = authorization ? { authorization } : {};
      const response = await firstValueFrom(
        this.httpService.request({
          method,
          url: `${url}${path}`,
          data: body,
          headers: safeHeaders,
        }),
      );

      return response.data;
    } catch (error) {
      console.error(`[Proxy] Error forwarding request to ${service}:`, {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
