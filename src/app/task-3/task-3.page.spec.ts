import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task3Page } from './task-3.page';

describe('Task3Page', () => {
  let component: Task3Page;
  let fixture: ComponentFixture<Task3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Task3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
