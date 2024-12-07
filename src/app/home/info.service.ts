import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INFO_KEY } from '../constants';
import { InfoObject } from '../types/infoObject';

@Injectable()
export class InfoService {

  constructor(private http: HttpClient) { }

  getInfoObject() {
    const URL = `/api/classes/Information/${INFO_KEY}`;

    return this.http.get<InfoObject>(URL);
  }


}
