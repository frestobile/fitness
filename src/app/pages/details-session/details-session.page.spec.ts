import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsSessionPage } from './details-session.page';

describe('DetailsBootcampPage', () => {
  let component: DetailsSessionPage;
  let fixture: ComponentFixture<DetailsSessionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
