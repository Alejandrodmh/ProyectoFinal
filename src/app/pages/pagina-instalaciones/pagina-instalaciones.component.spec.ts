import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInstalacionesComponent } from './pagina-instalaciones.component';

describe('PaginaInstalacionesComponent', () => {
  let component: PaginaInstalacionesComponent;
  let fixture: ComponentFixture<PaginaInstalacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaInstalacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
