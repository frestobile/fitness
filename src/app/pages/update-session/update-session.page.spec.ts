import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateSessionPage } from './update-session.page';

describe('CreateProgrammePage', () => {
  let component: UpdateSessionPage;
  let fixture: ComponentFixture<UpdateSessionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
