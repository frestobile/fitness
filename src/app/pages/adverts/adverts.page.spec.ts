import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvertsPage } from './adverts.page';

describe('AdvertsPage', () => {
  let component: AdvertsPage;
  let fixture: ComponentFixture<AdvertsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdvertsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
