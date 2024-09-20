import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SynchronizedPage } from './synchronized.page';

describe('SynchronizedPage', () => {
  let component: SynchronizedPage;
  let fixture: ComponentFixture<SynchronizedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SynchronizedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
