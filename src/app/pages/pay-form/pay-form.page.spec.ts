import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayFormPage } from './pay-form.page';

describe('PayFormPage', () => {
  let component: PayFormPage;
  let fixture: ComponentFixture<PayFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PayFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
