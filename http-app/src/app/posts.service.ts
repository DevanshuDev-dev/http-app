import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title, content };
        this.http.post<{ name: string }>('https://http-demo-angular-552dd-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
        // this.http.post<{ name: string }>('https://http-demo-angular-552d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
            postData).subscribe(res => {
                console.log(res)
            })
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>('https://http-demo-angular-552dd-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
        // return this.http.get<{ [key: string]: Post }>('https://http-demo-angular-552d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
            .pipe(map(res => {
                const posts = [];
                for (const key in res) {
                    posts.push({ ...res[key], id: key })
                }
                return posts;
            }))
    }

    deletePosts(){
        return this.http.delete('https://http-demo-angular-552dd-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json');
        // return this.http.delete('https://http-demo-angular-552d-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json');
    }
}