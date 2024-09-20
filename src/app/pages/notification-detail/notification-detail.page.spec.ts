import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationDetailPage } from './notification-detail.page';

describe('SuccessSessionPage', () => {
  let component: NotificationDetailPage;
  let fixture: ComponentFixture<NotificationDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotificationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
