import { TestBed } from '@angular/core/testing';

import { TiposUsuariosService } from './tiposUsuarios.service';

describe('TiposUsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TiposUsuariosService = TestBed.get(TiposUsuariosService);
    expect(service).toBeTruthy();
  });
});
