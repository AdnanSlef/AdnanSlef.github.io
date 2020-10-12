/* C Source this is based off of

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

function getRandomInt(min, max) {//[min,max)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/*Maybe Math.pow(2,64) works instead of bigint*/
class Weyl {
    constructor() {
        this.init_seed();
        this.s = 0xb5ad4eceda1ce2a9n; //weyl step value
        this.uint64 = 1n<<64n;
        this.uint32 = 1n<<32n;
    }
    nextRand() {
        this.w += this.s;
        this.w %= this.uint64;
        this.x = this.x * this.x + this.w;
        this.x %= this.uint64;
        this.x = (this.x>>32n) | (this.x <<32n);
        this.x %= this.uint64;
        return this.x % this.uint32;
    }
    init_seed() {
                var r1 = getRandomInt(0,Math.pow(2,32));
        var r2 = getRandomInt(0,Math.pow(2,32));
        this.x = (BigInt(r1)<<32n)+BigInt(r2);//mod uint64 unnecessary
                r1 = getRandomInt(0,Math.pow(2,32));
        r2 = getRandomInt(0,Math.pow(2,32));
        this.w = (BigInt(r1)<<32n)+BigInt(r2);//mod uint64 unnecessary
    }

}

/* Usage

gen = new Weyl();
console.log(gen.nextRand().toString())

*/