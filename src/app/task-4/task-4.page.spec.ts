import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task4Page } from './task-4.page';

describe('Task4Page', () => {
  let component: Task4Page;
  let fixture: ComponentFixture<Task4Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Task4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
