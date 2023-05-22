import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaServiciosComponent } from './pagina-servicios.component';

describe('PaginaServiciosComponent', () => {
  let component: PaginaServiciosComponent;
  let fixture: ComponentFixture<PaginaServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
