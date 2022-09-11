import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListblockComponent } from './listblock.component';

describe('ListblockComponent', () => {
  let component: ListblockComponent;
  let fixture: ComponentFixture<ListblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListblockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
