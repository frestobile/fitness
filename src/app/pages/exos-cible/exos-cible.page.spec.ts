import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExosCiblePage } from './exos-cible.page';

describe('ExosCiblePage', () => {
  let component: ExosCiblePage;
  let fixture: ComponentFixture<ExosCiblePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExosCiblePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
