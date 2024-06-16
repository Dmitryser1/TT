import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CrmService {
  private readonly clientId = process.env.CLIENT_ID;
  private readonly clientSecret = process.env.CLIENT_SECRET;
  private readonly redirectUri = process.env.REDIRECT_URI;
  private accessToken = process.env.ACCESS_TOKEN;
  private refreshToken = process.env.REFRESH_TOKEN;
  private readonly baseUrl = 'https://www.amocrm.ru/api/v4';

  constructor() {
    this.refreshAccessToken();
  }

  private async refreshAccessToken() {
    try {
      const response = await axios.post('https://www.amocrm.ru/oauth2/access_token', {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken,
        redirect_uri: this.redirectUri,
      });
      
      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;

    } catch (error) {
      console.error('Failed to refresh access token:', error);
    }
  }

  async getLeads(query?: string): Promise<any> {
    const endpoint = `${this.baseUrl}/leads`;
    const params = query ? { query } : {};
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };

    try {
      const response = await axios.get(endpoint, { headers, params });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        await this.refreshAccessToken();
        return this.getLeads(query);
      }
      throw new HttpException(`Error fetching leads: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}