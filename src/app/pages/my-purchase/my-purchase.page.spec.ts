import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPurchasePage } from './my-purchase.page';

describe('LogBookPage', () => {
  let component: MyPurchasePage;
  let fixture: ComponentFixture<MyPurchasePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
