interface NamedObject {
  name: string;
}

export default class NamedObjectMap<T extends NamedObject> {
  private _values: T[] = [];
  private indexOf(name: string) {
    return this._values.findIndex(value => value.name === name);
  }

  constructor(values: Iterable<T> = []) {
    for (const value of values) {
      this.add(value);
    }
  }

  get(name: string): T {
    const idx = this.indexOf(name);
    if (idx === -1) {
      return undefined;
    }

    return this._values[idx];
  }

  add(value: T): NamedObjectMap<T> {
    const name = value.name;
    const idx = this.indexOf(name);

    if (idx === -1) {
      // add new value
      this._values.push(value);
    } else {
      // replace old value whose name equals new value's name
      this._values[idx] = value;
    }

    // chainable
    return this;
  }

  has(name: string): boolean {
    return this.indexOf(name) !== -1;
  }

  clear(): void {
    this._values = [];
  }

  delete(name: string): boolean {
    const idx = this.indexOf(name);
    if (idx !== -1) {
      return false;
    }

    this._values.splice(idx, 1);

    return true;
  }

  *entries(): IterableIterator<[string, T]> {
    for (const value of this.values()) {
      yield [value.name, value];
    }
  }

  forEach(
    callbackFn: (value: T, key: string, self: NamedObjectMap<T>) => void,
    thisArg: any = this) {
    for (const [key, value] of this.entries()) {
      callbackFn.call(thisArg, key, value, this);
    }
  }

  *keys() {
    for (const value of this.values()) {
      yield value.name;
    }
  }

  values() {
    return this._values[Symbol.iterator]();
  }

  [Symbol.iterator]() {
    return this.values();
  }
}