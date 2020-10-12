/*

uint64_t x = 0, w = 0, s = 0xb5ad4eceda1ce2a9;

uint32_t nextRand() {
  w += s;
  x = x*x + w;
  x = (x>>32) | (x<<32);
  return x % (1UL<<32);
}

void init_seed() {
  uint64_t r1 = (uint64_t) randombytes_random();
  uint64_t r2 = (uint64_t) randombytes_random();
  x = (r1 << 32) + r2;
  r1 = (uint64_t) randombytes_random();
  r2 = (uint64_t) randombytes_random();
  w = (r1 << 32) + r2;
}

*/