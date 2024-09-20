import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportHealthDataPage } from './import-health-data.page';

describe('ImportHealthDataPage', () => {
  let component: ImportHealthDataPage;
  let fixture: ComponentFixture<ImportHealthDataPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImportHealthDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
