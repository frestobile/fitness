import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoricSubPage } from './historic-sub.page';

describe('HistoricSubPage', () => {
  let component: HistoricSubPage;
  let fixture: ComponentFixture<HistoricSubPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistoricSubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
