import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProgramPage } from './update-program.page';

describe('CreateProgrammePage', () => {
  let component: UpdateProgramPage;
  let fixture: ComponentFixture<UpdateProgramPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateProgramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
