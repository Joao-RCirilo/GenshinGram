import { Post } from './../models/post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private baseApiUrl = environment.baseApiUrl

  constructor(private http: HttpClient) { }

  save(post: Post){
    return this.http.post<Post>(`${this.baseApiUrl}/post`, post)
  }

}
