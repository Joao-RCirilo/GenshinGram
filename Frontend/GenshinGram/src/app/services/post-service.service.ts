import { Post } from './../models/post';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) { }

  save(post: Post){
    return this.http.post<Post>
  }

}
