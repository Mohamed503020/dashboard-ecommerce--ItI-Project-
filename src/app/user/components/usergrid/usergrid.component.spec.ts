import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergridComponent } from './usergrid.component';

describe('UsergridComponent', () => {
  let component: UsergridComponent;
  let fixture: ComponentFixture<UsergridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsergridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
