import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachProfilePage } from './coach-profile.page';

describe('CoachProfilePage', () => {
  let component: CoachProfilePage;
  let fixture: ComponentFixture<CoachProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoachProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
