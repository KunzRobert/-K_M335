import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartHuntPage } from './start-hunt.page';

describe('StartHuntPage', () => {
  let component: StartHuntPage;
  let fixture: ComponentFixture<StartHuntPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StartHuntPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
