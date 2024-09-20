import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgrammeResultPage } from './programme-result.page';

describe('ProgrammeResultPage', () => {
  let component: ProgrammeResultPage;
  let fixture: ComponentFixture<ProgrammeResultPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProgrammeResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
