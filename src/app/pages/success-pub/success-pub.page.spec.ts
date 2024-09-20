import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessPubPage } from './success-pub.page';

describe('SuccessPubPage', () => {
  let component: SuccessPubPage;
  let fixture: ComponentFixture<SuccessPubPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessPubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
