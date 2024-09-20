import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessSessionPage } from './success-session.page';

describe('SuccessSessionPage', () => {
  let component: SuccessSessionPage;
  let fixture: ComponentFixture<SuccessSessionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
