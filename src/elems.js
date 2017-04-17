import { Elem } from './Elem';
import { createHideStyleNode } from './helpers/Elem';

const {
  document = {}
} = global;

/**
 * @const {Elem} doc
 * @type {Elem}
 * @public
 * @description Elem instance of document.
 */
export const doc = new Elem(document);

/**
 * @const {Elem} html
 * @type {Elem}
 * @public
 * @description Elem instance of document.documentElement.
 */
export const html = new Elem(document.documentElement);

/**
 * @const {Elem} body
 * @type {Elem}
 * @public
 * @description Elem instance of document.body.
 */
export const body = new Elem(document.body);

/**
 * @const {Elem} head
 * @type {Elem}
 * @public
 * @description Elem instance of document.head.
 */
export const head = new Elem(document.head);

createHideStyleNode(head);
