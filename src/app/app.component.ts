import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

import { Comment, MentionPattern } from '../models/comment'; // Import the Comment interface
import { User } from '../models/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommentFormComponent, CommentsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  user: string = 'user';
  addComment(comment: Comment) {
    comment.content = this.markMentionsInBold(comment.content);
    console.log('Comment added:', comment);
    this.comments.push(comment);
  }

  title = 'Limble Comments with Mention support';

  /** sample comments data, not worrying about persistence here as this is just a test framework app */
  comments: Comment[] = [
    {
      id: 1,
      author: 'Alice',
      content: 'This is a great post!',
      timestamp: new Date(),
    },
    {
      id: 2,
      author: 'Bob',
      content: 'Thanks for sharing this information.',
      timestamp: new Date(),
    },
    {
      id: 3,
      author: 'Charlie',
      content: 'I found this very helpful.',
      timestamp: new Date(),
    },
  ];

  /** Sample users data, again not worrying about persistence for testing framework */
  users: User[] = [
    { userID: 1, name: 'Kevin' },
    { userID: 2, name: 'Jeff' },
    { userID: 3, name: 'Bryan' },
    { userID: 4, name: 'Gabbey' },
  ];

  notifyUser(userName: string) {
    const user = this.users.find((u) => u.name === userName);
    console.log('Exisgting user mentioned in message:', user);

    //TODO Handle the mention as needed, e.g., notify the user
  }

  private markMentionsInBold(content: string): string {
    return content.replace(MentionPattern, '<b>@$1</b>');
  }
}
