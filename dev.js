import RouterStateTemplate from './test/fixtures/Router/RouterState.pug';
import MainStateTemplate from './test/fixtures/Router/MainState.pug';
import UsersStateTemplate from './test/fixtures/Router/UsersState.pug';
import D, {
  Router, registerState
} from './dwayne';

D(Router.templateParams).deepAssign({
  header: 'Head router state'
});

Router.template = RouterStateTemplate;
Router.prototype.base
  .css({
    position: 'absolute',
    top: '100px',
    width: '100%',
    height: '500px'
  });

class MainState extends Router {
  static stateName = 'main';
  static path = '/';
  static template = MainStateTemplate;
  static templateParams = {
    subHeader: 'Main router state',
    content: 'Main state content'
  };
}

class UsersState extends MainState {
  static stateName = 'users';
  static path = '/users';
  static template = UsersStateTemplate;
  static templateParams = {
    header: 'Users'
  };
}

registerState(MainState);
registerState(UsersState);

Router.init();
