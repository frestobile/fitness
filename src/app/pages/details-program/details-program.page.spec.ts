import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsProgramPage } from './details-program.page';

describe('DetailsProgramPage', () => {
  let component: DetailsProgramPage;
  let fixture: ComponentFixture<DetailsProgramPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsProgramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
