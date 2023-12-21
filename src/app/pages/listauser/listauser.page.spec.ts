import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListauserPage } from './listauser.page';

describe('ListauserPage', () => {
  let component: ListauserPage;
  let fixture: ComponentFixture<ListauserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListauserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
