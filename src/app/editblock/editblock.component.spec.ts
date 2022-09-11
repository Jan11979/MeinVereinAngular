import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditblockComponent } from './editblock.component';

describe('EditblockComponent', () => {
  let component: EditblockComponent;
  let fixture: ComponentFixture<EditblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditblockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
