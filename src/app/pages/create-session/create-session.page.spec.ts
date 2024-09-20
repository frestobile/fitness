import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateSessionPage } from './create-session.page';

describe('CreateProgrammePage', () => {
  let component: CreateSessionPage;
  let fixture: ComponentFixture<CreateSessionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
