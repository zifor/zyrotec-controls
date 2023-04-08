import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZyrotecControlsComponent } from './zyrotec-controls.component';

describe('ZyrotecControlsComponent', () => {
  let component: ZyrotecControlsComponent;
  let fixture: ComponentFixture<ZyrotecControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZyrotecControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZyrotecControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
