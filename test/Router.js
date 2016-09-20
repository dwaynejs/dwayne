import { deepStrictEqual, strictEqual } from 'assert';
import RouterStateTemplate from './fixtures/Router/RouterState.pug';
import DefaultStateTemplate from './fixtures/Router/DefaultState.pug';
import MainStateTemplate from './fixtures/Router/MainState.pug';
import AboutStateTemplate from './fixtures/Router/AboutState.pug';
import UsersStateTemplate from './fixtures/Router/UsersState.pug';
import FriendsListStateTemplate from './fixtures/Router/FriendsListState.pug';
import UserStateTemplate from './fixtures/Router/UserState.pug';
import UserFriendStateTemplate from './fixtures/Router/UserFriendState.pug';
import RegExpStateTemplate from './fixtures/Router/RegExpState.pug';
import QueryStateTemplate from './fixtures/Router/QueryState.pug';
import UnreachableStateTemplate from './fixtures/Router/UnreachableState.pug';
import D, { Router, registerState, go, find } from '../dwayne';

let MainState;
let DefaultState;
let AboutState;
let UsersState;
let UserState;
let FriendsListState;
let UserFriendState;
let RegExpState;
let QueryState;
let UnreachableState;
let StringTemplateState;

before((done) => {
  const removeListener = Router.on('init', () => {
    done();

    removeListener();
  });

  initialize();
});

describe('it should test Router', () => {
  describe('it should be able to be initialized', () => {
    it('should set template params inheritance', () => {
      strictEqual(MainState.templateParams.header, 'Head router state');
      strictEqual(UsersState.templateParams.header, 'Users');
    });
    it('should set params inheritance', () => {
      strictEqual(UserFriendState.params.userId, 0);
    });
    it('should set query params inheritance', () => {
      // noinspection JSUnresolvedVariable
      strictEqual(Object.getPrototypeOf(MainState.query), Router.query);
    });
  });
  describe('it should get event listeners to work', () => {
    let clean = () => {};

    afterEach((done) => {
      clean();

      const removeListener = DefaultState.on('load', () => {
        removeListener();

        done();
      });

      go('/test.html');
    });
    it('should call event listeners on events', (done) => {
      clean = MainState.on('load', () => {
        done();
      });

      MainState.go();
    });
    it('should be able to pause events and continue them', (done) => {
      let continued = false;

      clean = MainState.on({
        beforeLoad(e) {
          e.pause();

          setTimeout(() => {
            continued = true;

            e.continue();
          }, 100);
        },
        load() {
          strictEqual(continued, true);

          done();
        }
      });

      MainState.go();
    });
    it('should be able to stop stoppable events', (done) => {
      clean = UnreachableState.on({
        beforeLoad(e) {
          e.stop();

          done();
        }
      });

      UnreachableState.on({
        load(e) {
          console.log('loaded', e);

          done(new Error('Couldn\'t stop the event'));
        }
      });

      UnreachableState.go();
    });
    it('should be able to stop stoppable events after pausing them', (done) => {
      clean = UnreachableState.on({
        beforeLoad(e) {
          e.pause();

          setTimeout(() => {
            e.stop();

            done();
          }, 100);
        }
      });

      UnreachableState.on({
        load() {
          done(new Error('Couldn\'t stop the event'));
        }
      });

      UnreachableState.go();
    });
    it('should not be able to stop unstoppable events by calling .stop()', (done) => {
      clean = MainState.on({
        load(e) {
          e.stop();
        },
        render() {
          done();
        }
      });

      MainState.go();
    });
    it('should not be able to stop unstoppable events by throwing an error', (done) => {
      clean = MainState.on({
        load() {
          throw new Error('I couldn\'t be stopped!');
        },
        render() {
          done();
        }
      });

      MainState.go();
    });
    it('should not be able to stop stoppable events fired on default state by calling .stop()', (done) => {
      clean = DefaultState.on({
        beforeLoad(e) {
          e.stop();
        },
        load() {
          done();
        }
      });

      go('/404');
    });
    it('should not be able to stop stoppable events fired on default state by throwing an error', (done) => {
      clean = DefaultState.on({
        beforeLoad() {
          throw new Error('I couldn\'t be stopped!');
        },
        load() {
          done();
        }
      });

      go('/404');
    });
    it('should consider prototype event listeners', (done) => {
      const oldListener = MainState.prototype.onLoad;

      MainState.prototype.onLoad = () => {
        done();
      };

      clean = () => {
        MainState.prototype.onLoad = oldListener;
      };

      MainState.go();
    });
    it('should bubble events', (done) => {
      clean = Router.on({
        render() {
          done();
        }
      });

      go('/404');
    });
  });
  describe('it should use template params for rendering', () => {
    let clean = () => {};

    afterEach((done) => {
      clean();

      const removeListener = DefaultState.on('load', () => {
        removeListener();

        done();
      });

      go('/test.html');
    });
    it('should use static template params', (done) => {
      clean = AboutState.on({
        render({ state }) {
          try {
            strictEqual(state.base.text(), AboutState.templateParams.content);

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      AboutState.go();
    });
    it('should use dynamic template params', (done) => {
      clean = DefaultState.on({
        render({ state }) {
          try {
            strictEqual(state.base.text(), `State not found (url: "${ state.url.pathname }"). Go to home.`);

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      go('/404');
    });
  });
  describe('it should manage URL params the right way', () => {
    let clean = () => {};

    afterEach((done) => {
      clean();

      const removeListener = DefaultState.on('load', () => {
        removeListener();

        done();
      });

      go('/test.html');
    });
    it('should reject wrong URL params', (done) => {
      clean = Router.on({
        render({ state }) {
          try {
            strictEqual(state.name, 'default');
            strictEqual(find('[dwayne-router-state="user"]').html(), '');

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      FriendsListState.go({
        params: {
          userId: 't'
        }
      });
    });
    it('should accept right URL params', (done) => {
      clean = FriendsListState.on({
        load() {
          done();
        }
      });

      FriendsListState.go({
        params: {
          userId: '56'
        }
      });
    });
    it('should resolve first level URL params', (done) => {
      clean = FriendsListState.on({
        load({ state }) {
          try {
            deepStrictEqual(state.params, { userId: '56' });

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      FriendsListState.go({
        params: {
          userId: 56
        }
      });
    });
    it('should resolve second level URL params', (done) => {
      clean = UserFriendState.on({
        load({ state }) {
          try {
            deepStrictEqual(state.params, {
              userId: '56',
              friendId: 'ttt'
            });

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      UserFriendState.go({
        params: {
          userId: 56,
          friendId: 'ttt'
        }
      });
    });
  });
  describe('it should manage query params the right way', () => {
    let clean = () => {};

    afterEach((done) => {
      clean();

      const removeListener = DefaultState.on('load', () => {
        removeListener();

        done();
      });

      go('/test.html');
    });
    it('should reject wrong query params', (done) => {
      clean = Router.on({
        render({ state }) {
          try {
            strictEqual(state.name, 'default');
            strictEqual(find('[dwayne-router-state="query"]').html(), '');

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      QueryState.go({
        query: {
          a: '',
          b: 't'
        }
      });
    });
    it('should accept right query params', (done) => {
      clean = QueryState.on({
        load() {
          done();
        }
      });

      QueryState.go({
        query: {
          a: '',
          b: '56'
        }
      });
    });
    it('should resolve query params', (done) => {
      clean = MainState.on({
        load({ state }) {
          console.log(state);

          try {
            deepStrictEqual(state.query, {
              a: '12',
              b: '',
              c: ['6', '8']
            });

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      MainState.go({
        query: {
          a: 12,
          b: '',
          c: [6, 8]
        }
      });
    });
  });
  describe('it should manage hash the right way', () => {
    let clean = () => {};

    afterEach((done) => {
      clean();

      const removeListener = DefaultState.on('load', () => {
        removeListener();

        done();
      });

      go('/test.html');
    });
    it('should set hash during redirect', (done) => {
      clean = MainState.on({
        load({ state }) {
          try {
            strictEqual(state.hash, 'hash');

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      MainState.go({
        hash: 'hash'
      });
    });
  });
  describe('it should proxy links clicks', () => {
    let clean = () => {};

    afterEach((done) => {
      clean();

      const removeListener = DefaultState.on('load', () => {
        removeListener();

        done();
      });

      go('/test.html');
    });
    it('should be able to stop event propagation', (done) => {
      clean = DefaultState.on({
        beforeLeave(e) {
          e.stop();

          done();
        }
      });

      UnreachableState.on({
        load() {
          done(new Error('Couldn\'t stop the event'));
        }
      });

      UnreachableState.go();
    });
  });
  describe('it should support regexp states', () => {
    let clean = () => {};

    afterEach((done) => {
      clean();

      const removeListener = DefaultState.on('load', () => {
        removeListener();

        done();
      });

      go('/test.html');
    });
    it('should reject wrong URL', (done) => {
      clean = Router.on({
        load({ state }) {
          try {
            strictEqual(state.name, 'default');
            strictEqual(find('[dwayne-router-state="regexp"]').html(), '');

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      go('/regex');
    });
    it('should accept right URL', (done) => {
      clean = RegExpState.on({
        load() {
          done();
        }
      });

      go('/regexp');
    });
  });
  describe('it should change titles and icons', () => {
    let clean = () => {};

    afterEach((done) => {
      clean();

      const removeListener = DefaultState.on('load', () => {
        removeListener();

        done();
      });

      go('/test.html');
    });
    it('should change the title if it\'s not the same', (done) => {
      clean = MainState.on({
        render() {
          try {
            strictEqual(find('#dwayne-router-title').text(), MainState.title);

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      MainState.go();
    });
    it('should change the icon if it\'s not the same', (done) => {
      clean = MainState.on({
        render() {
          try {
            strictEqual(find('#dwayne-router-icon').ref(), MainState.icon);

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      MainState.go();
    });
  });
  describe('it should support string templates', () => {
    let clean = () => {};

    afterEach((done) => {
      clean();

      const removeListener = DefaultState.on('load', () => {
        removeListener();

        done();
      });

      go('/test.html');
    });
    it('should support string templates', (done) => {
      clean = StringTemplateState.on({
        render() {
          try {
            strictEqual(find('[dwayne-router-state="stringTemplate"]').html(), StringTemplateState.template);

            done();
          } catch (err) {
            done(err);
          }
        }
      });

      StringTemplateState.go();
    });
  });
});

function initialize() {
  D(Router).assign({
    title: 'Router test',
    icon: '/test/images/icon2.png',
    template: RouterStateTemplate
  });

  Router.on('init', () => {
    D(Router.templateParams).deepAssign({
      header: 'Head router state',
      links: {
        relative: 'dogs',
        missing: '/trtrtr',
        outer: '//google.com',
        outerBlank: '//lostfilm.tv',
        home: MainState.buildURL(),
        about: AboutState.buildURL(),
        users: UsersState.buildURL(),
        user56: FriendsListState.buildURL({
          params: {
            userId: 56
          }
        }),
        regexp: '/regexp?a=2&b[]=3&b[]=4',
        regexp2: '/regexpexpr?a=2&b[]=3&b[]=4',
        brokenQuery: QueryState.buildURL({
          query: {
            c: 3,
            a: '',
            b: 't'
          }
        }),
        query: QueryState.buildURL({
          query: {
            c: 3,
            a: '',
            b: '56'
          }
        })
      }
    });
  });

  MainState = class extends Router {
    static stateName = 'main';
    static path = '/';
    static title = 'Home';
    static icon = '/test/images/icon1.png';
    static template = MainStateTemplate;
    static templateParams = {
      subHeader: 'Main router state',
      content: 'Main state content'
    };
  };
  DefaultState = class extends Router {
    static stateName = 'default';
    static path = '/';
    static template = DefaultStateTemplate;
    static templateParams = {
      link: MainState.buildURL()
    };

    constructor(props) {
      super(props);

      D(this.templateParams).deepAssign({
        content: `State not found (url: "${ this.url.pathname }"). Go to `
      });
    }
  };
  AboutState = class extends Router {
    static stateName = 'about';
    static path = '/about';
    static template = AboutStateTemplate;
    static templateParams = {
      content: 'It\'s awesome Dwayne Router. It can do everything.'
    };
  };
  UsersState = class extends Router {
    static stateName = 'users';
    static path = '/users';
    static template = UsersStateTemplate;
    static templateParams = {
      header: 'Users'
    };
  };
  UserState = class extends UsersState {
    static stateName = 'user';
    static path = '/:userId(\\d+)';
    static template = UserStateTemplate;
    static abstract = true;

    constructor(props) {
      super(props);

      const { params } = this;

      D(this.templateParams).deepAssign({
        params
      });
    }
  };
  FriendsListState = class extends UserState {
    static stateName = 'friendsList';
    static path = '/';
    static template = FriendsListStateTemplate;

    constructor(props) {
      super(props);

      const { userId } = this.params;

      D(this.templateParams).deepAssign({
        friendsList: D(['XX', 'YY', 'ZZ', '//']).map((name) => ({
          name: `friend ${ name }`,
          link: UserFriendState.buildURL({
            params: {
              userId,
              friendId: D(name).toLowerCase()
            }
          })
        })).$
      });
    }
  };
  UserFriendState = class extends UserState {
    static stateName = 'userFriend';
    static path = '/friend/:friendId';
    static template = UserFriendStateTemplate;

    constructor(props) {
      super(props);

      const { params } = this;

      D(this.templateParams).deepAssign({
        params,
        userLink: UserState.buildURL({
          params: {
            userId: params.userId
          }
        })
      });
    }
  };
  RegExpState = class extends Router {
    static stateName = 'regexp';
    static path = /\/regexp(expr)?(\?.*)?/;
    static template = RegExpStateTemplate;
    static templateParams = {
      header: 'RegExp State Header'
    };

    constructor(props) {
      super(props);

      this.templateParams.query = D(this.query)
        .json(6)
        .replace(/\n( *)/g, (match, spaces) => `<br>${ D('&nbsp;').repeat(spaces.length) }`);
    }
  };
  QueryState = class extends Router {
    static stateName = 'query';
    static path = '/query?a&b(\\d+)';
    static template = QueryStateTemplate;
    static templateParams = {
      header: 'Query State Header'
    };

    constructor(props) {
      super(props);

      this.templateParams.query = D(this.query)
        .json(6)
        .replace(/\n( *)/g, (match, spaces) => `<br>${ D('&nbsp;').repeat(spaces.length) }`);
    }
  };
  UnreachableState = class extends Router {
    static stateName = 'unreachable';
    static path = '/unreachable';
    static template = UnreachableStateTemplate;
  };
  StringTemplateState = class extends Router {
    static stateName = 'stringTemplate';
    static path = '/string-template';
    static template = 'string template';
  };

  registerState(MainState);
  registerState(DefaultState);
  registerState(AboutState);
  registerState(UsersState);
  registerState(UserState);
  registerState(FriendsListState);
  registerState(UserFriendState);
  registerState(RegExpState);
  registerState(QueryState);
  registerState(UnreachableState);
  registerState(StringTemplateState);

  Router.default = DefaultState;

  Router.init();
}
