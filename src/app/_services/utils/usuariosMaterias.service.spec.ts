import { TestBed } from '@angular/core/testing';

import { UsuariosMateriasService } from './usuariosMaterias.service';

describe('UsuariosMateriasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariosMateriasService = TestBed.get(UsuariosMateriasService);
    expect(service).toBeTruthy();
  });
});
