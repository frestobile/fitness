import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyProgramsPage } from './my-programs.page';

describe('MyProgramsPage', () => {
  let component: MyProgramsPage;
  let fixture: ComponentFixture<MyProgramsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyProgramsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
