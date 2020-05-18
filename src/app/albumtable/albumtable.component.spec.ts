import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumtableComponent } from './albumtable.component';

describe('AlbumtableComponent', () => {
  let component: AlbumtableComponent;
  let fixture: ComponentFixture<AlbumtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
