import { deepStrictEqual } from 'assert';
import { insertTemplates } from '../src';

describe('insertTemplates()', () => {
  it('should insert templates into another', () => {
    const baseTemplate = html`
      <div>
        123
        <!-- templateA -->
        <!-- templateC -->
      </div>
      <svg>
        <rect width="10" height="10"/>
        <!-- templateB -->
      </svg>
    `;

    const templateA = html`
      <span>Hello, world!</span>
      <i>123</i>
    `;
    const templateB = html`
      <circle r="10" cx="10" cy="10"/>
    `;
    const templateC = html`
      <b>important</b>
    `;

    insertTemplates(baseTemplate, {
      templateA,
      templateB,
      templateC
    });

    deepStrictEqual(baseTemplate, html`
      <div>
        123
        <span>Hello, world!</span>
        <i>123</i>
        <b>important</b>
      </div>
      <svg>
        <rect width="10" height="10"/>
        <circle r="10" cx="10" cy="10"/>
      </svg>
    `);
  });
  it('should merge the variables', () => {
    const baseTemplate = html`
      <div>
        123{a}
        <!-- templateA -->
        <!-- templateC -->
      </div>
      <svg>
        <rect width="10" height="10"/>
        <!-- templateB -->
      </svg>
    `;

    const templateA = html`
      <span>Hello, {who}!</span>
      <i>123</i>
    `;
    const templateB = html`
      <circle r="{size}" cx="10" cy="10"/>
    `;
    const templateC = html`
      <b d-show="{visible}">important</b>
    `;

    insertTemplates(baseTemplate, {
      templateA,
      templateB,
      templateC
    });

    deepStrictEqual(baseTemplate.vars, html`
      <div>
        123{a}
        <span>Hello, {who}!</span>
        <i>123</i>
        <b d-show="{visible}">important</b>
      </div>
      <svg>
        <rect width="10" height="10"/>
        <circle r="{size}" cx="10" cy="10"/>
      </svg>
    `.vars);
  });
});
