import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogBookPage } from './log-book.page';

describe('LogBookPage', () => {
  let component: LogBookPage;
  let fixture: ComponentFixture<LogBookPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
