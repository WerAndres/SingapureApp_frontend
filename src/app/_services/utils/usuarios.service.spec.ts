import { TestBed } from '@angular/core/testing';

import { UsuariosService } from './Usuarios.service';

describe('UsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuariosService = TestBed.get(UsuariosService);
    expect(service).toBeTruthy();
  });
});
