import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowProgrammesPage } from './show-programmes.page';

describe('ShowProgrammesPage', () => {
  let component: ShowProgrammesPage;
  let fixture: ComponentFixture<ShowProgrammesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowProgrammesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
