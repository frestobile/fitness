import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsLogbookPage } from './details-logbook.page';

describe('DetailsLogbookPage', () => {
  let component: DetailsLogbookPage;
  let fixture: ComponentFixture<DetailsLogbookPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsLogbookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
