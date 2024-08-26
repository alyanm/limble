import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentFormComponent } from './comment-form.component';

import { User } from '../../models/user';
import { Comment } from '../../models/comment';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should notify all users mentioned in the comment', () => {
    const users: User[] = [
      { userID: 1, name: 'Alice' },
      { userID: 2, name: 'Bob' },
      { userID: 3, name: 'Jeff' },
    ];
    component.users = users;

    const comment: Comment = {
      id: 1,
      author: 'Test Author',
      content: '@Jeff: Hello @Alice and @Bob',
      timestamp: new Date(),
    };
    component.comment = comment;

    spyOn(component.notifyUser, 'emit');

    component.findAllMentionsAndNotify();

    expect(component.notifyUser.emit).toHaveBeenCalledWith('Jeff');
    expect(component.notifyUser.emit).toHaveBeenCalledWith('Alice');
    expect(component.notifyUser.emit).toHaveBeenCalledWith('Bob');
  });

  it('should not notify users not mentioned in the comment', () => {
    const users: User[] = [
      { userID: 1, name: 'Alice' },
      { userID: 2, name: 'Bob' },
    ];
    component.users = users;

    const comment: Comment = {
      id: 1,
      author: 'Test Author',
      content: 'Hello @Charlie',
      timestamp: new Date(),
    };
    component.comment = comment;

    spyOn(component.notifyUser, 'emit');

    component.findAllMentionsAndNotify();

    expect(component.notifyUser.emit).not.toHaveBeenCalled();
  });

  it('should handle comments with no mentions', () => {
    const users: User[] = [
      { userID: 1, name: 'Alice' },
      { userID: 2, name: 'Bob' },
    ];
    component.users = users;

    const comment: Comment = {
      id: 1,
      author: 'Test Author',
      content: 'Hello everyone',
      timestamp: new Date(),
    };
    component.comment = comment;

    spyOn(component.notifyUser, 'emit');

    component.findAllMentionsAndNotify();

    expect(component.notifyUser.emit).not.toHaveBeenCalled();
  });
});
