import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';

describe('CryptoController', () => {
  let controller: CryptoController;
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [CryptoService],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
    service = module.get<CryptoService>(CryptoService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería firmar JSON y devolver un token', () => {
    const json = { data: 'test' };
    const token = controller.signJson(json);
    expect(typeof token).toBe('string');
  });

  it('debería verificar un token válido y devolver el JSON original', () => {
    const json = { data: 'test' };
    const token = controller.signJson(json);
    const verifiedJson = controller.verifyJson(token);

    if (verifiedJson && typeof verifiedJson === 'object' && 'iat' in verifiedJson) {
      delete verifiedJson['iat'];
    }

    expect(verifiedJson).toEqual(json);
  });

  it('debería devolver null para un token inválido', () => {
    const token = 'invalid-token';
    const verifiedJson = controller.verifyJson(token);
    expect(verifiedJson).toBeNull();
  });
});
