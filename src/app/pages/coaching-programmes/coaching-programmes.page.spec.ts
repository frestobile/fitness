import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoachingProgrammesPage } from './coaching-programmes.page';

describe('CoachingProgrammesPage', () => {
  let component: CoachingProgrammesPage;
  let fixture: ComponentFixture<CoachingProgrammesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoachingProgrammesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
