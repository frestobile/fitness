import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProgramPage } from './create-program.page';

describe('CreateProgrammePage', () => {
  let component: CreateProgramPage;
  let fixture: ComponentFixture<CreateProgramPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateProgramPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
