import * as assert from 'assert';
import NamedObjectMap from '../';

describe('NamedObjectMap', () => {
  describe('#constructor', () => {
    it('should construct an instance', () => {
      const map = new NamedObjectMap<{ name: string }>();
      assert(map instanceof NamedObjectMap);
    });
  });

  describe('#add', () => {
    it('should add value to map', () => {
      const map = new NamedObjectMap<{ name: string }>();
      const value = { name: 'hey' };
      map.add(value);
      assert.deepEqual((map as any)._values, [value]);
    });
  });

  context('when map includes value named "hey"', () => {
    const map = new NamedObjectMap<{ name: string }>();
    const value = { name: 'hey' };
    map.add(value);
    assert.deepEqual((map as any)._values, [value]);

    describe('#indexOf', () => {
      it('should return 0', () => {
        assert((map as any).indexOf(value.name) === 0);
      });
    });

    describe('#get', () => {
      it('should return the value named "hey"', () => {
        assert(map.get('hey') === value);
      });
    });
  });
});
