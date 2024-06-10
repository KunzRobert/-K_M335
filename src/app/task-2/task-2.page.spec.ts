import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task2Page } from './task-2.page';

describe('Task2Page', () => {
  let component: Task2Page;
  let fixture: ComponentFixture<Task2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Task2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
