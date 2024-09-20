import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfosPersonnelPage } from './infos-personnel.page';

describe('InfosPersonnelPage', () => {
  let component: InfosPersonnelPage;
  let fixture: ComponentFixture<InfosPersonnelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfosPersonnelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
