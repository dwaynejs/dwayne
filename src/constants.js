import { create } from './utils/objectStatics';

export const HIDE_CLASS = '__dwayne-hidden__';
export const SVG_NS = 'http://www.w3.org/2000/svg';
export const D_REST_REGEX = /^d-rest(?:#|$)/;

export const rootBlocks = create(null);
export const rootMixins = create(null);
export const {
  document = {}
} = global;
