import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'comments-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.css',
})
export class CommentsListComponent {
  @Input() comments: Comment[] = [];
}
