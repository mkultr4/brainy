import { BrandProfileModule } from './brand-profile.module';

describe('BrandProfileModule', () => {
  let brandProfileModule: BrandProfileModule;

  beforeEach(() => {
    brandProfileModule = new BrandProfileModule();
  });

  it('should create an instance', () => {
    expect(brandProfileModule).toBeTruthy();
  });
});
