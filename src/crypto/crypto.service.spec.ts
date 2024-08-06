import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign and verify a JSON object correctly', () => {
    const json = { data: 'test' };
    const token = service.signJson(json);
    const verifiedJson = service.verifyJson(token);

    if (verifiedJson && typeof verifiedJson === 'object' && 'iat' in verifiedJson) {
      delete verifiedJson['iat'];
    }

    expect(verifiedJson).toEqual(json);
  });

  it('should return null for a mutated token', () => {
    const json = { data: 'test' };
    const token = service.signJson(json);
    const mutatedToken = token + 'a';
    const verifiedJson = service.verifyJson(mutatedToken);
    expect(verifiedJson).toBeNull();
  });
});
